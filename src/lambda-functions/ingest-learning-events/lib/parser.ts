import { isRecord, isDeviceInfo, DeviceInfo } from "./types";
import {
  QuestionAnsweredMetadata,
  isQuestionAnsweredMetadata,
} from "../events/question-answered";
import {
  AssessmentStartedMetadata,
  parseAssessmentStartedMetadata,
} from "../events/assessment-started";
import {
  AssessmentCompletedMetadata,
  parseAssessmentCompletedMetadata,
} from "../events/assessment-completed";

type BaseEventFields = {
  sessionId?: string | null;
  deviceInfo?: DeviceInfo | null;
};

export type EventPayload =
  | (BaseEventFields & {
      eventType: "question_answered";
      metadata: QuestionAnsweredMetadata;
    })
  | (BaseEventFields & {
      eventType: "assessment_started";
      metadata: AssessmentStartedMetadata;
    })
  | (BaseEventFields & {
      eventType: "assessment_completed";
      metadata: AssessmentCompletedMetadata;
    });

export type ParseResult =
  | { ok: true; payload: EventPayload }
  | { ok: false; reason: string };

export function parseEventBody(rawBody: string | undefined): ParseResult {
  if (!rawBody) {
    return { ok: false, reason: "Missing request body" };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return { ok: false, reason: "Request body is not valid JSON" };
  }

  if (!isRecord(parsed)) {
    return { ok: false, reason: "Request body must be a JSON object" };
  }

  const { eventType, metadata, sessionId, deviceInfo } = parsed;

  if (typeof eventType !== "string") {
    return { ok: false, reason: "Missing or invalid eventType" };
  }

  const baseFields = {
    sessionId: typeof sessionId === "string" ? sessionId : null,
    deviceInfo: isDeviceInfo(deviceInfo) ? deviceInfo : null,
  };

  switch (eventType) {
    case "question_answered":
      if (!isQuestionAnsweredMetadata(metadata)) {
        return { ok: false, reason: "Invalid metadata for question_answered" };
      }
      return { ok: true, payload: { eventType, metadata, ...baseFields } };

    case "assessment_started": {
      const parsedMetadata = parseAssessmentStartedMetadata(metadata);
      if (!parsedMetadata) {
        return { ok: false, reason: "Invalid metadata for assessment_started" };
      }
      return { ok: true, payload: { eventType, metadata: parsedMetadata, ...baseFields } };
    }

    case "assessment_completed": {
      const parsedMetadata = parseAssessmentCompletedMetadata(metadata);
      if (!parsedMetadata) {
        return { ok: false, reason: "Invalid metadata for assessment_completed" };
      }
      return { ok: true, payload: { eventType, metadata: parsedMetadata, ...baseFields } };
    }

    default:
      return { ok: false, reason: `Unsupported eventType: ${eventType}` };
  }
}
