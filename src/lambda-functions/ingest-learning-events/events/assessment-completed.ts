import { isRecord, isStringArray } from "../lib/types";
import { ExamAreaId, StandardMode, isStandardMode, parseExamAreaId } from "./shared";

export type ExamCompletedMetadata = {
  mode: "exam";
  examArea: ExamAreaId;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  score: number;
  durationMs: number;
};

export type HardcoreCompletedMetadata = {
  mode: "hardcore";
  subjects: string[];
  totalQuestions: number;
  correct: number;
  incorrect: number;
  score: number;
  durationMs: number;
};

export type SubtopicCompletedMetadata = {
  mode: "subtopic";
  subjects: string[];
  totalQuestions: number;
  correct: number;
  incorrect: number;
  score: number;
  durationMs: number;
  timeExpired: boolean;
};

export type StandardCompletedMetadata = {
  mode: StandardMode;
  subjects: string[];
  totalQuestions: number;
  correct: number;
  incorrect: number;
  score: number;
  durationMs: number;
  timeExpired: boolean;
};

export type AssessmentCompletedMetadata =
  | ExamCompletedMetadata
  | HardcoreCompletedMetadata
  | SubtopicCompletedMetadata
  | StandardCompletedMetadata;

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

function computeDerived(totalQuestions: number, correct: number) {
  return {
    incorrect: totalQuestions - correct,
    score: totalQuestions > 0 ? (correct / totalQuestions) * 100 : 0,
  };
}

type ScoreFields = { totalQuestions: number; correct: number; durationMs: number };

function parseScoreFields(m: Record<string, unknown>): ScoreFields | null {
  const { totalQuestions, correct, durationMs } = m;
  if (typeof totalQuestions !== "number") return null;
  if (typeof correct !== "number") return null;
  if (typeof durationMs !== "number") return null;
  if (correct < 0 || correct > totalQuestions) return null;
  return { totalQuestions, correct, durationMs };
}

type SharedCompletedFields = ScoreFields & { subjects: string[] };

function parseSharedCompletedFields(
  m: Record<string, unknown>
): SharedCompletedFields | null {
  const { subjects } = m;
  if (!isStringArray(subjects)) return null;
  const sf = parseScoreFields(m);
  if (!sf) return null;
  return { subjects, ...sf };
}

function parseExamCompletedMetadata(
  m: Record<string, unknown>
): ExamCompletedMetadata | null {
  if (m.mode !== "exam") return null;
  const examArea = parseExamAreaId(m.examArea);
  if (!examArea) return null;
  const sf = parseScoreFields(m);
  if (!sf) return null;
  return { mode: "exam", examArea, ...sf, ...computeDerived(sf.totalQuestions, sf.correct) };
}

function parseHardcoreCompletedMetadata(
  m: Record<string, unknown>
): HardcoreCompletedMetadata | null {
  if (m.mode !== "hardcore") return null;
  const shared = parseSharedCompletedFields(m);
  if (!shared) return null;
  return { mode: "hardcore", ...shared, ...computeDerived(shared.totalQuestions, shared.correct) };
}

function parseSubtopicCompletedMetadata(
  m: Record<string, unknown>
): SubtopicCompletedMetadata | null {
  if (m.mode !== "subtopic") return null;
  const shared = parseSharedCompletedFields(m);
  if (!shared) return null;
  const { timeExpired } = m;
  if (typeof timeExpired !== "boolean") return null;
  return { mode: "subtopic", ...shared, timeExpired, ...computeDerived(shared.totalQuestions, shared.correct) };
}

function parseStandardCompletedMetadata(
  m: Record<string, unknown>
): StandardCompletedMetadata | null {
  const { mode } = m;
  if (!isStandardMode(mode)) return null;
  const shared = parseSharedCompletedFields(m);
  if (!shared) return null;
  const { timeExpired } = m;
  if (typeof timeExpired !== "boolean") return null;
  return { mode, ...shared, timeExpired, ...computeDerived(shared.totalQuestions, shared.correct) };
}

// ---------------------------------------------------------------------------
// Exported parser
// ---------------------------------------------------------------------------

export function parseAssessmentCompletedMetadata(
  m: unknown
): AssessmentCompletedMetadata | null {
  if (!isRecord(m)) return null;
  switch (m.mode) {
    case "exam":     return parseExamCompletedMetadata(m);
    case "hardcore": return parseHardcoreCompletedMetadata(m);
    case "subtopic": return parseSubtopicCompletedMetadata(m);
    case "subject":
    case "recent":
    case "random":   return parseStandardCompletedMetadata(m);
    default:         return null;
  }
}
