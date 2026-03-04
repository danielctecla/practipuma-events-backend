# Practipuma Analytics API

A serverless backend for ingesting learning events from the Practipuma app.

## Architecture

API Gateway (HTTP API v2) routes requests to Lambda functions. Lambda code is written in TypeScript and deployed via S3. Infrastructure is managed with Terraform.

Two layers:
- **`src/lambda-functions/`** — business logic, one directory per function
- **`iac/`** — Terraform modules and environment configurations

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Returns status, uptime, and environment |
| `POST` | `/events` | Authenticates via Bearer token, validates, and stores a learning event |

## POST /events — Event Payload

All requests require an `Authorization: Bearer <token>` header (validated against Supabase).

Top-level shape:

```json
{
  "eventType": "question_answered" | "assessment_started" | "assessment_completed",
  "sessionId": "...",
  "deviceInfo": { ... },
  "metadata": { ... }
}
```

`sessionId` and `deviceInfo` are optional. The shape of `metadata` depends on `eventType`.

### question_answered

```json
{
  "mode": "string",
  "questionId": "string",
  "subject": "string",
  "topic": "string",
  "difficulty": "string",
  "isCorrect": true,
  "timeSpentMs": 4200
}
```

`isCorrect` must be a boolean. `timeSpentMs` must be a number ≥ 0.

### assessment_started

Dispatches on `mode`:

**`"exam"`**
```json
{ "mode": "exam", "examArea": "1" | "2" | "3" | "4" }
```

**`"hardcore"`**
```json
{ "mode": "hardcore", "subjects": ["string"] }
```

**`"subtopic"`**
```json
{
  "mode": "subtopic",
  "subjects": ["string"],
  "topic": "string",
  "questionCount": 20,
  "timerEnabled": true,
  "timeLimit": 300,
  "justificationsEnabled": false
}
```
`timeLimit` may be `null`.

**`"subject"` | `"recent"` | `"random"`**

Same as `"subtopic"` but without `topic`.

### assessment_completed

Dispatches on `mode`:

**`"exam"`**
```json
{
  "mode": "exam",
  "examArea": "1" | "2" | "3" | "4",
  "totalQuestions": 20,
  "correct": 15,
  "incorrect": 5,
  "score": 75,
  "durationMs": 180000
}
```

**`"hardcore"`**
```json
{
  "mode": "hardcore",
  "subjects": ["string"],
  "totalQuestions": 20,
  "correct": 15,
  "incorrect": 5,
  "score": 75,
  "durationMs": 180000
}
```

**`"subtopic"`**
```json
{
  "mode": "subtopic",
  "subjects": ["string"],
  "totalQuestions": 20,
  "correct": 15,
  "incorrect": 5,
  "score": 75,
  "durationMs": 180000,
  "timeExpired": false
}
```

**`"subject"` | `"recent"` | `"random"`**

Same as `"subtopic"`.

All numeric fields must be ≥ 0.

## Project Structure

```
.
├── src/lambda-functions/
│   ├── build.sh                      # Builds one or all functions into function.zip
│   ├── health-check/                 # JavaScript, no dependencies
│   └── ingest-learning-events/       # TypeScript, Supabase
│       ├── index.ts                  # Entry point: auth → parse → insert
│       ├── lib/                      # auth, parser, database, shared types
│       └── events/                   # Per-event-type metadata types and guards
├── iac/
│   ├── environments/
│   │   ├── dev/                      # Active Terraform configuration
│   │   └── prod/                     # Production Terraform configuration
│   └── modules/
│       ├── lambda/                   # Lambda + IAM role module
│       └── apigateway/               # HTTP API + routes + CORS + logging module
└── .github/workflows/
    └── ci-deploy.yml                 # CI/CD pipeline
```

## Development

### Building Lambda functions

Run from `src/lambda-functions/`:

```bash
# Build all functions
npm run build

# Build a single function
./build.sh health-check
./build.sh ingest-learning-events

# Type-check without emitting (run inside the function directory)
npx tsc --noEmit

# Lint all functions
npm run lint
```

The build script compiles TypeScript, installs production dependencies, and packages everything into `function.zip`.

### Deploying infrastructure

Run from `iac/environments/dev/`:

```bash
terraform init
terraform plan
terraform apply
terraform output   # shows the API Gateway URL and endpoints
```

State is stored remotely in S3 (`practipuma-terraform-state-dev` for dev, `practipuma-terraform-state-prod` for prod).

## CI/CD

The pipeline runs on pushes to `develop` and on PRs targeting `develop` or `main`:

1. **ci** — type-checks `ingest-learning-events` and lints all functions
2. **build** — builds all Lambda ZIPs in parallel and uploads them as artifacts
3. **deploy-dev** — downloads artifacts, authenticates to AWS via OIDC, and runs `terraform plan` + `terraform apply`

The deploy step only runs on pushes (not on PRs).

## Environment Variables

### ingest-learning-events

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key for database access and auth validation |
| `IS_PRODUCTION` | No | Set to `"true"` in production; any other value (including unset) evaluates to false |

### health-check

| Variable | Required | Description |
|----------|----------|-------------|
| `IS_PRODUCTION` | No | Set to `"true"` in production; any other value (including unset) evaluates to false |
