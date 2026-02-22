variable "function_name" {
  type = string
}

variable "s3_bucket" {
  type = string
}

variable "s3_key" {
  type = string
}

variable "local_source_path" {
  description = "Local path to the Lambda function ZIP file"
  type        = string
  default     = null
}

variable "runtime" {
  type = string
  default = "nodejs22.x"
}

variable "handler" {
  type = string
  default = "index.handler"
}

variable "memory_size" {
  type    = number
  default = 128
}

variable "timeout" {
  type    = number
  default = 30
}

variable "environment_variables" {
  type    = map(string)
  default = {}
}

variable "policy_statements" {
  description = "Extra IAM policy statements for the Lambda"
  type        = list(any)
  default     = []
}

variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
  default     = {}
}