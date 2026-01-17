# Practipuma Analytics Infrastructure

This repository contains Terraform infrastructure code for deploying AWS Lambda functions used in the Practipuma analytics backend. The infrastructure uses a modular design with reusable components and environment-specific configurations.

## What's Inside

The infrastructure is built with [Terraform](https://www.terraform.io/) and uses the [AWS provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) to deploy serverless functions with properly configured IAM roles and CloudWatch logging.

## Techniques

- **Remote State Management with S3 Backend**: The configuration stores Terraform state remotely in S3 with encryption and lock file support, preventing concurrent modifications and state corruption. This is essential for team environments where multiple developers might run Terraform commands.

- **Module Composition**: The [modules/](modules) directory contains reusable Terraform modules that can be instantiated across different environments with varying configurations. This approach keeps infrastructure code DRY and enables consistent resource provisioning across dev, staging, and production environments.

- **Dynamic IAM Policy Concatenation**: The Lambda module uses Terraform's [`concat()`](https://developer.hashicorp.com/terraform/language/functions/concat) function to merge base logging permissions with custom policy statements passed as variables, allowing flexible permission grants without duplicating baseline policies.

- **Default Provider Tags**: Automatic resource tagging via the AWS provider's [`default_tags`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/resource-tagging#default-tags) block ensures consistent metadata across all resources without repeating tag blocks.

- **JSON Policy Generation**: IAM policies are defined using Terraform's [`jsonencode()`](https://developer.hashicorp.com/terraform/language/functions/jsonencode) function rather than raw JSON strings, enabling type checking and variable interpolation.

## Technologies

- **[Terraform](https://www.terraform.io/)** (>= 1.2): Infrastructure as Code tool for defining cloud resources declaratively
- **[AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)** (~> 5.92): Terraform provider for Amazon Web Services
- **[AWS Lambda](https://aws.amazon.com/lambda/)**: Serverless compute service for running code without managing servers
- **[AWS IAM](https://aws.amazon.com/iam/)**: Identity and Access Management for secure access control
- **[AWS S3](https://aws.amazon.com/s3/)**: Object storage for Lambda deployment packages and Terraform state
- **[AWS CloudWatch Logs](https://aws.amazon.com/cloudwatch/)**: Centralized logging service for Lambda function output

## Project Structure

```
iac/
├── environments/
│   ├── dev/
│   └── prod/
└── modules/
    └── lambda/
```

**`environments/`** - Environment-specific configurations (dev, prod). Each environment has its own AWS provider configuration, backend state, and module instantiations.

**`modules/`** - Reusable Terraform modules. Each module encapsulates a logical grouping of AWS resources that can be instantiated multiple times across different environments.
