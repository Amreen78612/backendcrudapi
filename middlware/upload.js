const express = require('express');
const multer  = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const fileName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
        cb(null, fileName);
    }
});

const imageFilter = function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Only PNG, JPG, and JPEG image files are allowed'), false);
    }
};

const uploadImage = multer({ 
    storage: imageStorage,
    limits: {
        fileSize: 1024 * 1024 * 20 // 20 MB तक की फाइल साइज लिमिट
    },
    fileFilter: imageFilter
});

module.exports = {
    uploadImage
};
