import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'application/pdf') {
        callback(null, true);
    } else {
        callback(new Error('Only PDF files are allowed'));
    }
};

const limits = {
    fileSize: 1024 * 1024 * 100, // 2 MB limit
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits,
});

export default upload;
