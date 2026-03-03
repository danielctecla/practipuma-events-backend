/**
 * Representa las áreas académicas del examen de la UNAM.
 *
 * 1 - Área I: Ciencias Físico-Matemáticas y de las Ingenierías
 * 2 - Área II: Ciencias Biológicas, Químicas y de la Salud
 * 3 - Área III: Ciencias Sociales
 * 4 - Área IV: Humanidades y Artes
 */
export type ExamAreaId = "1" | "2" | "3" | "4";

const EXAM_AREA_MAP: Readonly<Record<string, ExamAreaId>> = {
  area1: "1",
  area2: "2",
  area3: "3",
  area4: "4",
};

/** Maps frontend "areaX" strings to canonical ExamAreaId, or undefined if invalid. */
export function parseExamAreaId(raw: unknown): ExamAreaId | undefined {
  if (typeof raw !== "string") return undefined;
  return EXAM_AREA_MAP[raw];
}

export const STANDARD_MODES = ["subject", "recent", "random"] as const;
export type StandardMode = typeof STANDARD_MODES[number];

export function isStandardMode(v: unknown): v is StandardMode {
  return typeof v === "string" && (STANDARD_MODES as readonly string[]).includes(v);
}