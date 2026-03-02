import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import type { EventPayload } from "./parser";

// Module-level client so it is reused across warm Lambda invocations.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const isProduction = process.env.IS_PRODUCTION === "true";

// ---------------------------------------------------------------------------
// Database insert
// DB column names are snake_case — map explicitly from camelCase payload.
// ---------------------------------------------------------------------------

type InsertResult =
  | { ok: true }
  | { ok: false; error: string };

export async function insertUserEvent(
  userId: string,
  payload: EventPayload
): Promise<InsertResult> {
  const { error } = await supabase.from("user_events").insert({
    user_id: userId,
    event_type: payload.eventType,
    metadata: payload.metadata,
    session_id: payload.sessionId ?? null,
    device_info: payload.deviceInfo ?? null,
    is_production: isProduction,
  });

  if (error) {
    console.error("Failed to insert user_event", {
      eventType: payload.eventType,
      userId,
      error: error.message,
      code: error.code,
    });
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
