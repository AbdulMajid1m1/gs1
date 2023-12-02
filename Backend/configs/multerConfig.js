import multer from 'multer';
import path from 'path';

// Function to create a Multer storage configuration based on dynamic fields
const createStorage = (fields) => multer.diskStorage({
    destination: (req, file, cb) => {
        const field = fields.find(f => f.name === file.fieldname);
        const storagePath = field ? field.path : 'public/uploads'; // Use specified path or default
        cb(null, storagePath);
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

// Function to create a file filter
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, .png, .gif, .pdf, .doc, .docx formats are allowed!'));
    }
};

// Generic upload function
export const upload = (fields) => {
    const multerFields = fields.map(field => ({ name: field.name, maxCount: 1 }));
    return multer({
        storage: createStorage(fields),
        fileFilter: fileFilter,
        limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
    }).fields(multerFields);
};
