output "api_gateway_url" {
  description = "Base URL of the API Gateway"
  value       = module.api_gateway.stage_invoke_url
}

output "health_check_endpoint" {
  description = "Health check endpoint URL"
  value       = "${module.api_gateway.stage_invoke_url}/health"
}

output "health_check_lambda_arn" {
  description = "ARN of health check Lambda"
  value       = module.health_check_lambda.lambda_arn
}

output "ingest_events_endpoint" {
  description = "Ingest learning events endpoint URL"
  value       = "${module.api_gateway.stage_invoke_url}/events"
}
