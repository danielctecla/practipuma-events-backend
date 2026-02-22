# Practipuma Analytics Infrastructure

This directory contains the Infrastructure as Code (IaC) definitions for the Practipuma Analytics API, utilizing Terraform to manage AWS serverless resources. It employs a modular architecture to provision API Gateway HTTP APIs and Lambda functions across multiple environments.

## Techniques

The codebase leverages several advanced patterns to ensure maintainability and observability:

- **Dynamic Route Generation**: API routes are programmatically generated from a list of route objects using Terraform's [`for_each`](https://developer.hashicorp.com/terraform/language/meta-arguments/for_each) meta-argument. This allows for clean, data-driven route definitions without repetitive resource blocks.
- **Structured JSON Logging**: Access logs are formatted as [JSON](https://developer.mozilla.org/en-US/docs/Glossary/JSON) using `jsonencode`. This structure captures key metrics like [HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) and latency, enabling powerful querying via CloudWatch Insights.
- **CORS Configuration**: Cross-Origin Resource Sharing is explicitly configured to manage browser security policies. See [MDN Web Docs: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for details on how `allow_origins` and `allow_methods` control access.
- **Conditional Source Hashing**: The Lambda module uses `filebase64sha256` to calculate source code hashes, ensuring functions are only redeployed when the actual code changes.
- **Context Variable Injection**: Detailed request context (IP, request ID, error messages) is injected into logs using API Gateway [context variables](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#context-variable-reference), providing deep visibility into request lifecycle.

## Technologies

Key technologies and libraries used in this infrastructure:

- **[Terraform](https://www.terraform.io/)**: The core IaC tool used for declarative infrastructure management.
- **[AWS HTTP API (API Gateway v2)](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)**: A lighter, lower-latency alternative to REST APIs, optimized for serverless workloads.
- **[AWS Lambda](https://aws.amazon.com/lambda/)**: Serverless compute service for executing backend logic.
- **[Amazon CloudWatch](https://aws.amazon.com/cloudwatch/)**: specific focus on Log Groups for centralized, structured logging.

## Project Structure

```
iac/
├── environments/
│   ├── dev/               # Development environment configuration
│   └── prod/              # Production environment configuration
└── modules/
    ├── apigateway/        # Reusable HTTP API module with CORS and logging
    └── lambda/            # Generic Lambda function wrapper with IAM setup
```

- **[environments/](environments/)**: Contains stateful environment instantiations. Each subdirectory represents a deployment stage (e.g., `dev`, `prod`) and calls modules with stage-specific variables.
- **[modules/apigateway/](modules/apigateway/)**: Defines the HTTP API gateway, including route definitions, integration links, and access logging configuration.
- **[modules/lambda/](modules/lambda/)**: Encapsulates Lambda function creation, including IAM role assumption, policy attachment, and S3-based code deployment.
