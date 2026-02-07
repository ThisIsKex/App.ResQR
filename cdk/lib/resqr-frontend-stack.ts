import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class ResQRFrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket für das Frontend
    const websiteBucket = new s3.Bucket(this, "ResQRWebsiteBucket", {
      bucketName: `resqr-frontend-${this.account}`,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html", // SPA Support
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
    });

    // Origin Access Identity für CloudFront
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "ResQROAI",
      {
        comment: "OAI for ResQR Frontend",
      }
    );

    // Bucket Policy - Erlaubt CloudFront Zugriff
    websiteBucket.grantRead(originAccessIdentity);

    // CloudFront Distribution
    const distribution = new cloudfront.Distribution(
      this,
      "ResQRDistribution",
      {
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin: origins.S3BucketOrigin.withOriginAccessIdentity(websiteBucket, {
            originAccessIdentity: originAccessIdentity,
          }),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
          compress: true,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        },
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: cdk.Duration.minutes(5),
          },
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: cdk.Duration.minutes(5),
          },
        ],
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
        enableLogging: false,
        comment: "ResQR Vue.js Frontend Distribution",
      }
    );

    // Deploy des dist Ordners nach S3
    new s3deploy.BucketDeployment(this, "ResQRDeployment", {
      sources: [s3deploy.Source.asset("../dist")],
      destinationBucket: websiteBucket,
      distribution: distribution,
      distributionPaths: ["/*"],
      prune: true,
    });

    // Outputs
    new cdk.CfnOutput(this, "BucketName", {
      value: websiteBucket.bucketName,
      description: "S3 Bucket Name",
      exportName: "ResQRBucketName",
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
      description: "CloudFront Distribution ID",
      exportName: "ResQRDistributionId",
    });

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.distributionDomainName,
      description: "CloudFront Distribution Domain Name",
      exportName: "ResQRDistributionDomain",
    });

    new cdk.CfnOutput(this, "WebsiteURL", {
      value: `https://${distribution.distributionDomainName}`,
      description: "Website URL",
      exportName: "ResQRWebsiteURL",
    });
  }
}
