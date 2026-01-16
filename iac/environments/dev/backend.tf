terraform {
  backend "s3" {
    bucket         = "practipuma-terraform-state-dev"
    key            = "infra/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    use_lockfile = true
  }
}