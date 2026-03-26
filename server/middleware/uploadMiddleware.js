import multer from 'multer';
import { uploadCloud } from '../config/cloudinary.js';

export const uploadImage = uploadCloud.single('image');

export const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: 'File upload error: ' + err.message,
        });
    } else if (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
    next();
};
