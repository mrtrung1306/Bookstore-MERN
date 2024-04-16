const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../backend/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + file.originalname);
    }
});

const uploads = multer({
    storage: storage
}).single('image');

module.exports = uploads;