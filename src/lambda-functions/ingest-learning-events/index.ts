import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { validateSession } from "./lib/auth";
import { toApiResponse } from "./lib/types";
import { parseEventBody } from "./lib/parser";
import { insertUserEvent } from "./lib/database";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const authHeader = event.headers?.authorization;

  if (!authHeader) {
    return toApiResponse(401, { error: "Unauthorized" });
  }

  const user = await validateSession(authHeader);

  if (!user) {
    return toApiResponse(401, { error: "Unauthorized" });
  }

  const parsed = parseEventBody(event.body);

  if (!parsed.ok) {
    return toApiResponse(400, { error: parsed.reason });
  }

  console.log("Ingesting event", {
    userId: user.id,
    eventType: parsed.payload.eventType,
  });

  const result = await insertUserEvent(user.id, parsed.payload);

  if (!result.ok) {
    return toApiResponse(500, { error: result.error });
  }

  return toApiResponse(200, { message: "Event recorded" });
};
