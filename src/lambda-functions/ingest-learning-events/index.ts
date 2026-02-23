import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { validateSession } from "./lib/auth";
import { toApiResponse } from "./lib/types";
import { parseEventBody } from "./lib/parser";
import { insertUserEvent } from "./lib/database";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const authHeader = event.headers?.authorization;

  if (!authHeader) {
    return toApiResponse<{ error: string }>({
      statusCode: 401,
      body: { error: "Unauthorized" },
    });
  }

  const user = await validateSession(authHeader);

  if (!user) {
    return toApiResponse<{ error: string }>({
      statusCode: 401,
      body: { error: "Unauthorized" },
    });
  }

  const parsed = parseEventBody(event.body);

  if (!parsed.ok) {
    return toApiResponse<{ error: string }>({
      statusCode: 400,
      body: { error: parsed.reason },
    });
  }

  console.log("Ingesting event", {
    userId: user.id,
    eventType: parsed.payload.eventType,
  });

  const { error } = await insertUserEvent(user.id, parsed.payload);

  if (error) {
    return toApiResponse<{ error: string }>({
      statusCode: 500,
      body: { error: "Failed to record event" },
    });
  }

  return toApiResponse<{ message: string }>({
    statusCode: 200,
    body: { message: "Event recorded" },
  });
};
