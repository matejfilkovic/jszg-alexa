## Environment variables

Required environment variables for deployment (.env file):

- `REGION`: AWS region of Lambda and S3 bucket
- `BUCKET_NAME`: S3 bucket name, where Lambda zip will be uploaded
- `LAMBDA_ZIP_FILENAME`: Name of a zip file which will be created during the build
- `LAMBDA_FUNCTION_NAME`: Name of the Lambda function
