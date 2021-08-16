const multer = require('multer');
const express = require('express');
const router = express.Router();

// Intializing the upload 
const upload = multer({
    storage: storage
}).single('blog-pic')

router.post('/')