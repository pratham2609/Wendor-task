import { Storage } from '@google-cloud/storage';
import path from 'path';

// Path to your service account key file
const keyFilename = path.join(__dirname, '../../vibrant-map-430907-i2-ea2a25d2a192.json');
const storage = new Storage({ keyFilename });
const bucketName = 'wendor';
export const bucket = storage.bucket(bucketName);
