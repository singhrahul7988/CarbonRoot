export const SECTION_REVEAL_INITIAL = {
  opacity: 0,
  scale: 0.985,
  y: 24,
} as const;

export const SECTION_REVEAL_ENTER = {
  duration: 0.8,
  ease: "power3.out",
  opacity: 1,
  scale: 1,
  y: 0,
} as const;

export const SECTION_REVEAL_TRIGGER = {
  once: true,
  start: "top 88%",
} as const;

export const HERO_REVEAL_DELAY = 0.06;
