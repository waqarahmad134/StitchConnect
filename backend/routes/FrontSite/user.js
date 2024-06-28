const express = require('express');
const router = express();
const multer = require('multer');
const path = require('path');
const {validateToken} = require("../../middlewares/AuthorizationMW")
const asyncMiddleware = require('../../middlewares/async');
const userController = require('../../controllers/FrontSite/userController');


let x = 1;
const uploadimage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public/images`)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Math.floor(Math.random() * 1000000000) + '-' + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: uploadimage,
});


router.post('/register',upload.single('image'),asyncMiddleware(userController.registration));
router.post('/login',asyncMiddleware(userController.login));
router.post('/forget_password',asyncMiddleware(userController.forget_password));
router.post('/change_password_after_otp',asyncMiddleware(userController.change_password_after_otp));
router.post('/update_profile',validateToken,asyncMiddleware(userController.update_profile));



module.exports = router;