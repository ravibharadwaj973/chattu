import multer from "multer";

export const multerUpload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5, 
    },
})

export const singleFile=multerUpload.single('avatar');
export const attectmentsMulter=multerUpload.array('files',5)