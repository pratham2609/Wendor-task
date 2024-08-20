import { Request, Response, NextFunction } from 'express';
import { bucket } from '../config/gcp';
import { ApiError } from './ApiError';


export const uploadAvatarImage = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        throw new ApiError(400, 'Please upload a file');
    }
    const blob = bucket.file(`avatars/${req.user?.fullName}-${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
        resumable: false,
        gzip: true,
        metadata: {
            cacheControl: 'public, max-age=31536000',
        },
    });

    blobStream.on('error', (err) => {
        res.status(500).send('File upload failed.');
    });

    blobStream.on('finish', async () => {
        try {
            // Construct the public URL and attach it to the request object
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            req.fileUrl = publicUrl; // Attach the URL to the request object

            next();
        } catch (error) {
            console.log(error)
            res.status(500).send('Failed to make file public.');
        }
    });

    blobStream.end(req.file.buffer);
};
