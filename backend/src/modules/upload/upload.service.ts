import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '../../lib/s3';
import { v4 as uuidv4 } from 'uuid';

export class UploadService {
  private bucket: string;
  private publicUrl: string;

  constructor() {
    this.bucket = process.env.R2_BUCKET_NAME || 'eaoverseas';
    this.publicUrl = process.env.R2_PUBLIC_URL || '';
  }

  async saveFile(file: any): Promise<string> {
    const fileExtension = file.filename.split('.').pop();
    const key = `${uuidv4()}.${fileExtension}`;
    
    // Read stream to buffer for S3 upload
    const buffer = await file.toBuffer();

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: file.mimetype,
    });

    await r2Client.send(command);

    // Return the public URL pointing to the R2 developer endpoint
    return `${this.publicUrl}/${key}`;
  }
}
