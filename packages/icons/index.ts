export const iconNames = ["arrow-right", "close", "search"] as const;

export type IconName = (typeof iconNames)[number];
