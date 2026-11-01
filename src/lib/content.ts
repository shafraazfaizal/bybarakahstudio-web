// Edit this file to add your content videos later.
// Put the .mp4 in /public/media and set `src` (and a poster image) — the slot switches from "coming soon" to the player automatically.

export type VideoSlot = { src: string | null; poster: string; caption: string };

export const NUR_FILM: VideoSlot = {
  src: "/media/nur-film.mp4",
  poster: "/media/nur-film-poster.jpg",
  caption: "NUR, a journal for Ramadan",
};

export const KIDS_FILM: VideoSlot = {
  src: null, // e.g. "/media/kids-film.mp4"
  poster: "/books/kids-cover.webp",
  caption: "My Ramadan Book",
};
