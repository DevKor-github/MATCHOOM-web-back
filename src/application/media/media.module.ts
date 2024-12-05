import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
    imports: [
        MulterModule.register({})
    ],
    providers: [
        {
            provide: 'S3_CLIENT',
            useFactory: () => {
                return new S3Client({
                    region: process.env.AWS_REGION,
                    credentials: {
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
                    }
                })
            }
        }, MediaService],
    controllers: [MediaController],
    exports: ['S3_CLIENT']
})
export class MediaModule {}