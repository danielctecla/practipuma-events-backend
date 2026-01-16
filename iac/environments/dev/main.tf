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

module "health_check_lamba" {
  source = "../../modules/lambda"

  function_name = "healt-check"

  s3_bucket = "practipuma-lambda-code-dev"
  s3_key    = "health-check/function.zip"
}