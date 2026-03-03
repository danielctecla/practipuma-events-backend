import { isRecord, isStringArray } from "../lib/types";
import { ExamAreaId } from "./shared";

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
  mode: "subject" | "recent" | "random";
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

function isExamAssessmentMetadata(
  m: Record<string, unknown>
): m is ExamAssessmentMetadata {
  return (
    m.mode === "exam" &&
    (m.examArea === "1" ||
      m.examArea === "2" ||
      m.examArea === "3" ||
      m.examArea === "4")
  );
}

function isHardcoreAssessmentMetadata(
  m: Record<string, unknown>
): m is HardcoreAssessmentMetadata {
  return m.mode === "hardcore" && isStringArray(m.subjects);
}

function isSubtopicAssessmentMetadata(
  m: Record<string, unknown>
): m is SubtopicAssessmentMetadata {
  return (
    m.mode === "subtopic" &&
    isStringArray(m.subjects) &&
    typeof m.topic === "string" &&
    typeof m.questionCount === "number" &&
    typeof m.timerEnabled === "boolean" &&
    (typeof m.timeLimit === "number" || m.timeLimit === null) &&
    typeof m.justificationsEnabled === "boolean"
  );
}

function isStandardAssessmentMetadata(
  m: Record<string, unknown>
): m is StandardAssessmentMetadata {
  return (
    (m.mode === "subject" || m.mode === "recent" || m.mode === "random") &&
    isStringArray(m.subjects) &&
    typeof m.questionCount === "number" &&
    typeof m.timerEnabled === "boolean" &&
    (typeof m.timeLimit === "number" || m.timeLimit === null) &&
    typeof m.justificationsEnabled === "boolean"
  );
}

export function isAssessmentStartedMetadata(
  m: unknown
): m is AssessmentStartedMetadata {
  if (!isRecord(m)) return false;
  switch (m.mode) {
    case "exam":     return isExamAssessmentMetadata(m);
    case "hardcore": return isHardcoreAssessmentMetadata(m);
    case "subtopic": return isSubtopicAssessmentMetadata(m);
    case "subject":
    case "recent":
    case "random":   return isStandardAssessmentMetadata(m);
    default:         return false;
  }
}
