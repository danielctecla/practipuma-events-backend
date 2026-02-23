import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import type { EventPayload } from "./parser";

// Module-level client so it is reused across warm Lambda invocations.
const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ---------------------------------------------------------------------------
// Database insert
// DB column names are snake_case — map explicitly from camelCase payload.
// ---------------------------------------------------------------------------

export async function insertUserEvent(
  userId: string,
  payload: EventPayload
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("user_events").insert({
    user_id: userId,
    event_type: payload.eventType,
    metadata: payload.metadata,
    session_id: payload.sessionId ?? null,
    device_info: payload.deviceInfo ?? null,
    is_production: process.env.IS_PRODUCTION === "true",
  });

  if (error) {
    console.error("Failed to insert user_event", {
      eventType: payload.eventType,
      userId,
      error: error.message,
      code: error.code,
    });
    return { error: error.message };
  }

  return { error: null };
}
