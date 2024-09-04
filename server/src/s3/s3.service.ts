import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private s3Bucket: string | undefined;
  private region: string | undefined;

  constructor(private configService: ConfigService) {
    this.s3Bucket = this.configService.get<string>('AWS_S3_BUCKET');
    this.region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );

    if (!accessKeyId || !secretAccessKey) {
      throw new Error('Missing AWS S3 configuration');
    }

    this.s3 = new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });
  }

  async uploadFile(file: Express.Multer.File, location: string) {
    const name: string = 'uploads/' + location + '/' + file.originalname;
    return await this.s3Upload(file.buffer, this.s3Bucket, name, file.mimetype);
  }

  async s3Upload(file: any, bucket: any, name: any, mimetype: any) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      //ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.region,
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getPreSignedURLToViewObject(key: string) {
    try {
      const params = {
        Bucket: this.s3Bucket,
        Key: key,
        Expires: 300,
      };

      return await this.s3.getSignedUrlPromise('getObject', params);
    } catch (error) {
      throw error;
    }
  }
}
