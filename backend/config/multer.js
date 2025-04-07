import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Check for both regular image types and WebP
  if (file.mimetype.startsWith("image/") || file.mimetype === "image/webp") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ 
  storage,
  limits: {
    fileSize: 40 * 1024 * 1024, // 40MB limit per file
    files: 30 // Maximum 30 files (1 couple + 1 landscape + 28 wedding)
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'coupleImage' || 
        file.fieldname === 'landscapeImage' || 
        file.fieldname === 'weddingImages' || 
        file.fieldname === 'videoThumbnail') {
      fileFilter(req, file, cb);
    } else {
      cb(new Error('Unexpected field: ' + file.fieldname), false);
    }
  }
});

export default upload;
