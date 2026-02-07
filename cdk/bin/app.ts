#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ResQRFrontendStack } from '../lib/resqr-frontend-stack';

const app = new cdk.App();

new ResQRFrontendStack(app, 'ResQRFrontendStack', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
  },
  description: 'ResQR Vue.js Frontend with S3 and CloudFront'
});

app.synth();
