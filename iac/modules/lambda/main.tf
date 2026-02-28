resource "aws_iam_role" "this" {
  name = "${var.function_name}-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action : "sts:AssumeRole"
      Effect : "Allow"
      Principal : {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "this" {
  name = "${var.function_name}-policy"
  role = aws_iam_role.this.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = concat(
      [{
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }],
      var.policy_statements
    )
  })
}

resource "aws_s3_object" "lambda_code" {
  count = var.local_source_path != null ? 1 : 0

  bucket = var.s3_bucket
  key    = var.s3_key
  source = var.local_source_path
  source_hash = filemd5(var.local_source_path)

  tags = var.tags
}

resource "aws_lambda_function" "this" {
  function_name = var.function_name
  role = aws_iam_role.this.arn

  s3_bucket = var.s3_bucket
  s3_key = var.s3_key
  source_code_hash = var.local_source_path != null ? filebase64sha256(var.local_source_path) : null
  
  runtime = var.runtime
  handler = var.handler

  memory_size = var.memory_size
  timeout = var.timeout

  environment {
    variables = var.environment_variables
  }

  tags = merge(var.tags, {
    Name = var.function_name
  })

  depends_on = [aws_s3_object.lambda_code]
}