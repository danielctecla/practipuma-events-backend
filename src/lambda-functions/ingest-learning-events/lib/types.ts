import type { Json } from "./database.types";

export type { Json };

export type LambdaResponse<T extends Record<string, unknown>> = {
  statusCode: number;
  body: T;
};

export const toApiResponse = <T extends Record<string, unknown>>(
  response: LambdaResponse<T>
) => ({
  statusCode: response.statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(response.body),
});

// ---------------------------------------------------------------------------
// Learning event types
// ---------------------------------------------------------------------------

export const SUPPORTED_EVENT_TYPES = [
  "question_answered",
  "assessment_started",
  "assessment_completed",
] as const;

export type EventType = (typeof SUPPORTED_EVENT_TYPES)[number];

export type DeviceInfo = {
  userAgent: string;
  platform: string;
  screenResolution: string;
  language: string;
  timezone: string;
};

// ---------------------------------------------------------------------------
// Shared runtime type guards
// ---------------------------------------------------------------------------

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function isDeviceInfo(value: unknown): value is DeviceInfo {
  if (!isRecord(value)) return false;
  return (
    typeof value.userAgent === "string" &&
    typeof value.platform === "string" &&
    typeof value.screenResolution === "string" &&
    typeof value.language === "string" &&
    typeof value.timezone === "string"
  );
}
