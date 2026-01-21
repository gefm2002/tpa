import eventsSeed from "../data/seed.events.json";
import recapsSeed from "../data/seed.recaps.json";
import faqsSeed from "../data/seed.faq.json";
import testimonialsSeed from "../data/seed.testimonials.json";
import settingsSeed from "../data/settings.json";
import type { Snapshot } from "../types";

const STORAGE_KEY = "tpa_snapshot_v1";

export const notifySnapshotUpdate = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("tpa_snapshot_update"));
};

export const buildSeedSnapshot = (): Snapshot => ({
  events: eventsSeed,
  recaps: recapsSeed,
  faqs: faqsSeed,
  testimonials: testimonialsSeed,
  settings: settingsSeed,
});

export const getSnapshot = (): Snapshot => {
  if (typeof window === "undefined") {
    return buildSeedSnapshot();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const seed = buildSeedSnapshot();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  try {
    const parsed = JSON.parse(stored) as Snapshot;
    return parsed;
  } catch {
    const seed = buildSeedSnapshot();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
};

export const saveSnapshot = (snapshot: Snapshot) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  notifySnapshotUpdate();
};

export const exportSnapshot = () => {
  const snapshot = getSnapshot();
  return JSON.stringify(snapshot, null, 2);
};

export const importSnapshot = (json: string) => {
  const parsed = JSON.parse(json) as Snapshot;
  saveSnapshot(parsed);
  return parsed;
};

export const resetToSeed = () => {
  const seed = buildSeedSnapshot();
  saveSnapshot(seed);
  return seed;
};
