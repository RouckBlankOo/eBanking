const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let subDir = '';

        switch (file.fieldname) {
            case 'profilePicture':
                subDir = 'images-users';
                break;
            case 'passport':
            case 'front':
            case 'back':
                subDir = 'identity-documents';
                break;
            default:
                subDir = 'public';
        }
        const fullPath = path.join(process.cwd(), 'uploads', subDir);
        cb(null, fullPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG,JPG and PNG images are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

module.exports = upload;