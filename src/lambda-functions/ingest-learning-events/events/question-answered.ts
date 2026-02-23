import { isRecord } from "../lib/types";

export type QuestionAnsweredMetadata = {
  mode: string;
  questionId: string;
  subject: string;
  topic: string;
  difficulty: string;
  isCorrect: boolean;
  timeSpentMs: number;
};

export function isQuestionAnsweredMetadata(
  m: unknown
): m is QuestionAnsweredMetadata {
  if (!isRecord(m)) return false;
  return (
    typeof m.mode === "string" &&
    typeof m.questionId === "string" &&
    typeof m.subject === "string" &&
    typeof m.topic === "string" &&
    typeof m.difficulty === "string" &&
    typeof m.isCorrect === "boolean" &&
    typeof m.timeSpentMs === "number" &&
    m.timeSpentMs >= 0
  );
}
