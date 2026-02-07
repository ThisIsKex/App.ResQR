# ResQR CDK Infrastructure

AWS CDK Infrastructure for the ResQR Vue.js Frontend with S3 and CloudFront.

## Prerequisites

- Node.js and npm installed
- AWS CLI installed and configured
- AWS CDK CLI installed: `npm install -g aws-cdk`
- AWS Account with appropriate permissions

## Installation

```bash
cd cdk
npm install
```

## Configuration

Make sure your AWS Credentials are configured:

```bash
aws configure
```

### AWS Profile

This project uses the AWS profile `YOUR_PROFILE`. Set the environment variable in PowerShell:

```powershell
$env:AWS_PROFILE = "YOUR_PROFILE"
```

Or in Bash/Zsh:

```bash
export AWS_PROFILE=YOUR_PROFILE
```

Alternatively, a `.env` file with `AWS_PROFILE=YOUR_PROFILE` is available in the `cdk` folder.

## Bootstrap (one-time per AWS Account/Region)

```bash
cdk bootstrap
```

## Deployment

### 1. Build the Vue.js Frontend

First, the frontend must be built:

```bash
cd ..
npm run build
```

### 2. CDK Deployment

```bash
cd cdk
npm run deploy
```

Or directly with CDK:

```bash
cdk deploy
```

## Useful Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Compile TypeScript in watch mode
- `npm run cdk` - Run CDK CLI
- `npm run deploy` - Deploy the stack
- `npm run diff` - Show changes
- `npm run synth` - Generate CloudFormation template
- `npm run destroy` - Delete the stack

## Stack Details

The stack creates:

- **S3 Bucket**: For hosting static website files
- **CloudFront Distribution**: For global content delivery with HTTPS
- **Origin Access Identity**: For secure access from CloudFront to S3
- **S3 Bucket Deployment**: Automatic deployment of the `dist` folder

## Outputs

After deployment, you will receive the following outputs:

- `BucketName`: Name of the S3 Bucket
- `DistributionId`: CloudFront Distribution ID
- `DistributionDomainName`: CloudFront Domain
- `WebsiteURL`: Complete URL to the website

## Notes

- The S3 Bucket is configured with `RETAIN` policy and will not be automatically deleted when the stack is deleted
- CloudFront uses `PRICE_CLASS_100` (USA, Canada, Europe)
- The distribution automatically redirects HTTP to HTTPS
- SPA routing is supported through error response mapping for 404/403 to index.html

## Custom Domain (Optional)

To use a custom domain, the following changes must be made:

1. Create Route53 Hosted Zone
2. Create ACM Certificate in `us-east-1`
3. Modify the stack to add `certificate` and `domainNames` to the CloudFront Distribution
4. Create Route53 Alias Record

## Troubleshooting

### Invalidate CloudFront Cache

```bash
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
```

### Display Stack Outputs

```bash
cdk deploy --outputs-file outputs.json
```
