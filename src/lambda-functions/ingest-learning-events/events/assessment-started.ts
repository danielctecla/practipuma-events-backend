import { isRecord, isStringArray } from "../lib/types";
import { ExamAreaId, StandardMode, isStandardMode, parseExamAreaId } from "./shared";

export type { ExamAreaId };

export type ExamAssessmentMetadata = {
  mode: "exam";
  examArea: ExamAreaId;
};

export type HardcoreAssessmentMetadata = {
  mode: "hardcore";
  subjects: string[];
};

export type SubtopicAssessmentMetadata = {
  mode: "subtopic";
  subjects: string[];
  topic: string;
  questionCount: number;
  timerEnabled: boolean;
  timeLimit: number | null;
  justificationsEnabled: boolean;
};

export type StandardAssessmentMetadata = {
  mode: StandardMode;
  subjects: string[];
  questionCount: number;
  timerEnabled: boolean;
  timeLimit: number | null;
  justificationsEnabled: boolean;
};

export type AssessmentStartedMetadata =
  | ExamAssessmentMetadata
  | HardcoreAssessmentMetadata
  | SubtopicAssessmentMetadata
  | StandardAssessmentMetadata;

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

type SharedSessionFields = {
  subjects: string[];
  questionCount: number;
  timerEnabled: boolean;
  timeLimit: number | null;
  justificationsEnabled: boolean;
};

function parseSharedSessionFields(
  m: Record<string, unknown>
): SharedSessionFields | null {
  const { subjects, questionCount, timerEnabled, timeLimit, justificationsEnabled } = m;
  if (!isStringArray(subjects)) return null;
  if (typeof questionCount !== "number") return null;
  if (typeof timerEnabled !== "boolean") return null;
  if (typeof timeLimit !== "number" && timeLimit !== null) return null;
  if (typeof justificationsEnabled !== "boolean") return null;
  return { subjects, questionCount, timerEnabled, timeLimit, justificationsEnabled };
}

function parseExamAssessmentMetadata(
  m: Record<string, unknown>
): ExamAssessmentMetadata | null {
  if (m.mode !== "exam") return null;
  const examArea = parseExamAreaId(m.examArea);
  if (!examArea) return null;
  return { mode: "exam", examArea };
}

function parseHardcoreAssessmentMetadata(
  m: Record<string, unknown>
): HardcoreAssessmentMetadata | null {
  if (m.mode !== "hardcore") return null;
  const { subjects } = m;
  if (!isStringArray(subjects)) return null;
  return { mode: "hardcore", subjects };
}

function parseSubtopicAssessmentMetadata(
  m: Record<string, unknown>
): SubtopicAssessmentMetadata | null {
  if (m.mode !== "subtopic") return null;
  const { topic } = m;
  if (typeof topic !== "string") return null;
  const shared = parseSharedSessionFields(m);
  if (!shared) return null;
  return { mode: "subtopic", topic, ...shared };
}

function parseStandardAssessmentMetadata(
  m: Record<string, unknown>
): StandardAssessmentMetadata | null {
  const { mode } = m;
  if (!isStandardMode(mode)) return null;
  const shared = parseSharedSessionFields(m);
  if (!shared) return null;
  return { mode, ...shared };
}

// ---------------------------------------------------------------------------
// Exported parser
// ---------------------------------------------------------------------------

export function parseAssessmentStartedMetadata(
  m: unknown
): AssessmentStartedMetadata | null {
  if (!isRecord(m)) return null;
  switch (m.mode) {
    case "exam":     return parseExamAssessmentMetadata(m);
    case "hardcore": return parseHardcoreAssessmentMetadata(m);
    case "subtopic": return parseSubtopicAssessmentMetadata(m);
    case "subject":
    case "recent":
    case "random":   return parseStandardAssessmentMetadata(m);
    default:         return null;
  }
}
