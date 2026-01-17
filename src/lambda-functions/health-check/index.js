exports.handler = async (event, context) => {
  console.log("Health check invoked");

  try {
    const timestamp = new Date().toISOString();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "healthy",
        timestamp,
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
      }),
    };
  } catch (error) {
    console.error("Health check failed:", error);

    return {
      statusCode: 503,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};