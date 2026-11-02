"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendOwnerNotification, sendWaitlistEmail } from "@/lib/email";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
  name?: string;
  values?: { name: string; email: string };
  email?: string;
};

const schema = z.object({
  name: z.string().trim().min(1, "Please tell us your name.").max(80),
  email: z.string().trim().toLowerCase().email("That email doesn't look right.").max(160),
  interest: z.enum(["nur", "kids", "both"], { message: "Choose a journal." }),
  country: z.enum(["uk", "sri_lanka", "elsewhere"], { message: "Tell us where you are." }),
  consent: z.literal("on", { message: "Please tick the box so we can email you." }),
});

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  // Honeypot: real people never fill this hidden field.
  if (String(formData.get("company") ?? "").length > 0) return { status: "success", name: "friend" };

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    interest: formData.get("interest"),
    country: formData.get("country"),
    consent: formData.get("consent"),
  });
  const values = { name: String(formData.get("name") ?? ""), email: String(formData.get("email") ?? "") };
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form.", values };

  const { name, email, interest, country } = parsed.data;
  const firstName = name.split(" ")[0];
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    // Lets you preview the form locally before Supabase is connected.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[waitlist] Supabase env vars missing — simulated signup for", email);
      return { status: "success", name: firstName, email };
    }
    return { status: "error", message: "The waitlist isn't connected yet. Please try again soon.", values };
  }

  const h = await headers();
  const { error } = await supabase.from("waitlist").insert({
    name,
    email,
    interest,
    country,
    consent: true,
    source: "barakah.skayl.digital",
    user_agent: h.get("user-agent")?.slice(0, 300) ?? null,
  });

  if (error) {
    if (error.code === "23505") return { status: "success", name: firstName, message: "already" }; // already on the list
    console.error("[waitlist] insert failed", error);
    return { status: "error", message: "Something went wrong on our side. Please try again.", values };
  }

  // Both emails are best-effort: the signup is already saved even if one fails.
  const results = await Promise.allSettled([
    sendWaitlistEmail({ to: email, name: firstName, interest }),
    sendOwnerNotification({ name, email, interest, country }),
  ]);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("[waitlist] email failed:", r.reason);
  });

  return { status: "success", name: firstName, email };
}
