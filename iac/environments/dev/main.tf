provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      STAGE = "dev"
      PROJECT = "practipuma"
      MANAGED = "terraform"
    }
  }
}

module "health_check_lambda" {
  source = "../../modules/lambda"

  function_name = "health-check"

  s3_bucket = "practipuma-lambda-code-dev"
  s3_key    = "health-check/function.zip"
  
  # Local path to the built Lambda function
  local_source_path = "${path.root}/../../../src/lambda-functions/health-check/function.zip"
}

module "ingest_learning_events_lambda" {
  source = "../../modules/lambda"

  function_name = "ingest-learning-events"

  s3_bucket = "practipuma-lambda-code-dev"
  s3_key    = "ingest-learning-events/function.zip"

  local_source_path = "${path.root}/../../../src/lambda-functions/ingest-learning-events/function.zip"
}

module "api_gateway" {
  source = "../../modules/apigateway"

  name = "practipuma-event-gateway"
  stage_name = "dev"

  lambda_integrations = {
    health = {
      lambda_invoke_arn    = module.health_check_lambda.invoke_arn
      lambda_function_name = module.health_check_lambda.function_name
    }
    ingest_learning_events = {
      lambda_invoke_arn    = module.ingest_learning_events_lambda.invoke_arn
      lambda_function_name = module.ingest_learning_events_lambda.function_name
    }
  }

  cors_allow_origins = ["*"]
  cors_allow_methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]

  routes = [
    { method = "GET",  path = "/health", integration_key = "health" },
    { method = "POST", path = "/events", integration_key = "ingest_learning_events" }
  ]

}