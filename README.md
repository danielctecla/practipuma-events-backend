# Practipuma Analytics API

Practipuma Analytics API is a serverless backend designed to ingest and process learning events. It utilizes AWS Lambda and API Gateway, managed via Terraform infrastructure-as-code (IaC) to ensure reproducible deployments across development and production environments.

## Techniques

The codebase leverages several techniques to ensure maintainability and scalability:

- **Asynchronous Event Handling**: Lambda functions utilize [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) syntax for non-blocking execution, essential for high-throughput event processing.
- **Structured Error Responses**: API responses use `try...catch` blocks to capture exceptions and return valid [JSON](https://developer.mozilla.org/en-US/docs/Global_Objects/JSON) objects with appropriate [HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status), ensuring clients can parse errors programmatically.
- **Microservice Build Automation**: A custom [build script](src/lambda-functions/build.sh) iterates through function directories, managing dependencies and compiling [TypeScript](https://www.typescriptlang.org/) to JavaScript individually for each lambda.
- **Runtime Environment Configuration**: Application logic adapts to its environment (dev/prod) by reading injected [environment variables](https://developer.mozilla.org/en-US/docs/Web/API/Process/env) (via `process.env`), decoupling configuration from code.

## Technologies

Key technologies and libraries used in this project:

- **[Terraform](https://www.terraform.io/)**: Used for defining and provisioning the cloud infrastructure components.
- **[AWS Lambda](https://aws.amazon.com/lambda/)**: Serverless compute service that runs the backend logic in response to API Gateway events.
- **[TypeScript](https://www.typescriptlang.org/)**: Provides static typing for the lambda functions, enhancing code quality and developer experience.
- **[Bash](https://www.gnu.org/software/bash/)**: Used for the build and packaging automation.

## Project Structure

```
.
├── iac/
│   ├── environments/     # Environment-specific configuration (dev/prod)
│   └── modules/          # Reusable Terraform modules for API Gateway and Lambda
└── src/
    └── lambda-functions/ # Source code for individual Lambda functions
```

- **[iac/](iac/)**: Contains all Infrastructure as Code definitions. See the [IAC README](iac/README.md) for detailed documentation on the infrastructure modules.
- **[src/lambda-functions/](src/lambda-functions/)**: Holds the business logic. Each subdirectory corresponds to a specific Lambda function with its own `package.json` and `tsconfig.json`.
