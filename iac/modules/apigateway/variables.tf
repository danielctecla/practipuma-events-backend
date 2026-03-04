variable "name" {
  description = "Name of the API Gateway"
  type        = string
}

variable "stage" {
  description = "Deployment stage (e.g., dev, prod)"
  type        = string
}

variable "lambda_integrations" {
  description = "Map of Lambda functions to integrate with API Gateway"
  type = map(object({
    lambda_invoke_arn    = string
    lambda_function_name = string
  }))
  default = {}
}

variable "routes" {
  description = "List of routes mapping to lambda integrations"
  type = list(object({
    method          = string
    path            = string
    integration_key = string
  }))
  default = []
}

variable "cors_allow_origins" {
  description = "Allowed origins for CORS"
  type        = list(string)
  default     = ["*"]
}

variable "cors_allow_methods" {
  description = "Allowed methods for CORS"
  type        = list(string)
  default     = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}

variable "cors_allow_headers" {
  description = "Allowed headers for CORS"
  type        = list(string)
  default     = ["*"]
}

variable "cors_max_age" {
  description = "Max age for CORS preflight requests in seconds"
  type        = number
  default     = 300
}

variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
  default     = {}
}