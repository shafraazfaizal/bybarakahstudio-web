// Ramadan 1448 is expected to begin around 8 February 2027 (subject to moon sighting).
// Update this one date if the expected start changes.
export const RAMADAN_START = new Date("2027-02-08T00:00:00Z");

export function daysUntilRamadan(now = new Date()) {
  const ms = RAMADAN_START.getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export const INSTAGRAM_URL = "https://www.instagram.com/bybarakahstudio/";
export const INSTAGRAM_HANDLE = "@bybarakahstudio";
