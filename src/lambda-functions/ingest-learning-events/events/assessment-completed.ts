import { isRecord } from "../lib/types";

export type AssessmentCompletedMetadata = {
  mode: string;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  score: number;
  durationMs: number;
};

export function isAssessmentCompletedMetadata(
  m: unknown
): m is AssessmentCompletedMetadata {
  if (!isRecord(m)) return false;
  return (
    typeof m.mode === "string" &&
    typeof m.totalQuestions === "number" &&
    typeof m.correct === "number" &&
    typeof m.incorrect === "number" &&
    typeof m.score === "number" &&
    typeof m.durationMs === "number" &&
    m.totalQuestions >= 0 &&
    m.correct >= 0 &&
    m.incorrect >= 0 &&
    m.durationMs >= 0
  );
}
