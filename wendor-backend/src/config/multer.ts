import multer from 'multer';

const multerConfig = multer({
    storage: multer.memoryStorage(),
});

export { multerConfig };
