import { Request, Response, NextFunction } from 'express';
import { bucket } from '../config/gcp';


export const uploadAvatarImage = async (req: Request, res: Response, next: NextFunction) => {
    await uploadFileToFolder(req, res, next, 'avatars');
};

const uploadFileToFolder = async (req: Request, res: Response, next: NextFunction, folder: string) => {
    if (!req.file) {
        return next(); // If no file, proceed without adding anything to the request
    }
    const blob = bucket.file(`${folder}/${req.user?.fullName}-${req.file.originalname}`);
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
            // Make the file public
            // await blob.makePublic();

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
