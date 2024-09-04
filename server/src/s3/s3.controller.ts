// src/s3/s3.controller.ts

import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload/:location')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'application/octet-stream' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('location') location: string,
  ) {
    this.s3Service.uploadFile(file, location);
  }

  @Get('get-file/:key')
  getFile(@Param('key') key: string) {
    return this.s3Service.getPreSignedURLToViewObject(key);
  }
}
