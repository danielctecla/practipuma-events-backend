import { isRecord, isStringArray } from "../lib/types";

export type CompletedExamAreaId = "1" | "2" | "3" | "4";

export type ExamCompletedMetadata = {
  mode: "exam";
  examArea: CompletedExamAreaId;
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
  mode: "subject" | "recent" | "random";
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

function isExamCompletedMetadata(
  m: Record<string, unknown>
): m is ExamCompletedMetadata {
  return (
    m.mode === "exam" &&
    (m.examArea === "1" ||
      m.examArea === "2" ||
      m.examArea === "3" ||
      m.examArea === "4") &&
    typeof m.totalQuestions === "number" &&
    typeof m.correct === "number" &&
    typeof m.incorrect === "number" &&
    typeof m.score === "number" &&
    typeof m.durationMs === "number"
  );
}

function isHardcoreCompletedMetadata(
  m: Record<string, unknown>
): m is HardcoreCompletedMetadata {
  return (
    m.mode === "hardcore" &&
    isStringArray(m.subjects) &&
    typeof m.totalQuestions === "number" &&
    typeof m.correct === "number" &&
    typeof m.incorrect === "number" &&
    typeof m.score === "number" &&
    typeof m.durationMs === "number"
  );
}

function isSubtopicCompletedMetadata(
  m: Record<string, unknown>
): m is SubtopicCompletedMetadata {
  return (
    m.mode === "subtopic" &&
    isStringArray(m.subjects) &&
    typeof m.totalQuestions === "number" &&
    typeof m.correct === "number" &&
    typeof m.incorrect === "number" &&
    typeof m.score === "number" &&
    typeof m.durationMs === "number" &&
    typeof m.timeExpired === "boolean"
  );
}

function isStandardCompletedMetadata(
  m: Record<string, unknown>
): m is StandardCompletedMetadata {
  return (
    (m.mode === "subject" || m.mode === "recent" || m.mode === "random") &&
    isStringArray(m.subjects) &&
    typeof m.totalQuestions === "number" &&
    typeof m.correct === "number" &&
    typeof m.incorrect === "number" &&
    typeof m.score === "number" &&
    typeof m.durationMs === "number" &&
    typeof m.timeExpired === "boolean"
  );
}

export function isAssessmentCompletedMetadata(
  m: unknown
): m is AssessmentCompletedMetadata {
  if (!isRecord(m)) return false;
  switch (m.mode) {
    case "exam":     return isExamCompletedMetadata(m);
    case "hardcore": return isHardcoreCompletedMetadata(m);
    case "subtopic": return isSubtopicCompletedMetadata(m);
    case "subject":
    case "recent":
    case "random":   return isStandardCompletedMetadata(m);
    default:         return false;
  }
}
