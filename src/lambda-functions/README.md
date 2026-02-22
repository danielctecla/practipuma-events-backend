# Practipuma Lambda Functions

This directory contains AWS Lambda functions for the Practipuma analytics backend. Each function is self-contained with its own dependencies and can be built individually or as a batch.

## What's Inside

The project uses TypeScript for type-safe serverless functions and includes an automated build system that compiles TypeScript, bundles dependencies, and creates deployment-ready ZIP files for AWS Lambda.

## Techniques

- **Automated Build Pipeline**: The [build.sh](build.sh) script recursively discovers Lambda functions and builds them automatically. It handles both TypeScript and JavaScript functions, compiles code, installs production dependencies, and creates deployment artifacts.

- **TypeScript Strict Mode**: All TypeScript Lambda functions use [strict mode](https://www.typescriptlang.org/tsconfig#strict) compilation, enabling comprehensive type checking including `strictNullChecks`, `strictFunctionTypes`, and `noImplicitAny` to catch errors at compile time.

- **ES2020 Target Compilation**: Functions are compiled to [ES2020](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference), which provides modern JavaScript features like [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining), [nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing), and [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) while maintaining compatibility with Node.js 18.x runtime.

- **Type-Safe Lambda Handlers**: Functions use the `APIGatewayProxyHandler` type from `@types/aws-lambda`, providing compile-time validation of event structures, context objects, and return values.

- **Conditional Dependency Installation**: The build script intelligently checks for `package.json` before running `npm install`, allowing functions without external dependencies to skip the installation step entirely.

## Technologies

- **[TypeScript](https://www.typescriptlang.org/)** (^5.9.3): Type-safe superset of JavaScript
- **[Node.js](https://nodejs.org/)** (18.x runtime): JavaScript runtime for AWS Lambda
- **[@types/aws-lambda](https://www.npmjs.com/package/@types/aws-lambda)** (^8.10.159): TypeScript type definitions for AWS Lambda events and handlers
- **[@types/node](https://www.npmjs.com/package/@types/node)** (^25.0.9): TypeScript type definitions for Node.js built-in modules
- **[AWS SDK v2](https://www.npmjs.com/package/aws-sdk)** (^2.1498.0): AWS SDK for JavaScript used in function dependencies
- **[ts-node](https://www.npmjs.com/package/ts-node)** (^10.9.2): TypeScript execution engine for Node.js

## Project Structure

```
src/lambda-functions/
├── health-check/
├── ingest-learning-events/
├── build.sh
├── package.json
└── tsconfig.json
```

**`health-check/`** - Simple health check endpoint that returns service status, timestamp, and uptime information.

**`ingest-learning-events/`** - Lambda function for ingesting learning event data with AWS SDK dependencies.

**`build.sh`** - Automated build script that compiles TypeScript, bundles dependencies, and creates deployment ZIP files for each Lambda function.
