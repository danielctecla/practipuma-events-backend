export type ApiGatewayResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
};

export const toApiResponse = <T>(
  statusCode: number,
  body: T
): ApiGatewayResponse => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
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
