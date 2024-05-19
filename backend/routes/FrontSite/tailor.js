const express = require('express');
const router = express();
const multer = require('multer');
const path = require('path');
const {validateToken} = require("../../middlewares/AuthorizationMW")
const asyncMiddleware = require('../../middlewares/async');
const tailorController = require('../../controllers/FrontSite/tailorController');

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


router.post('/registration',upload.single('image'),asyncMiddleware(tailorController.registration));
router.post('/login',asyncMiddleware(tailorController.login));
router.get('/all_products',asyncMiddleware(tailorController.all_products));
router.get('/featured_products',asyncMiddleware(tailorController.featured_products));
router.get('/tailor_products',asyncMiddleware(tailorController.tailor_products));
router.get('/shop_products',asyncMiddleware(tailorController.shop_products));
router.get('/get_all_shops',asyncMiddleware(tailorController.get_all_shops));
router.post('/search_products',asyncMiddleware(tailorController.search_products));
router.get('/product_details/:productId',asyncMiddleware(tailorController.product_details));
router.get('/shop_details/:shopId',asyncMiddleware(tailorController.shop_details));
router.get('/get_profile/:userId',asyncMiddleware(tailorController.get_profile));
router.post('/place_order',asyncMiddleware(tailorController.place_order));
router.get('/after_payment/:orderId',asyncMiddleware(tailorController.after_payment));
router.post('/send_message',asyncMiddleware(tailorController.send_message));
router.get('/get_users',asyncMiddleware(tailorController.get_users));
router.post('/get_chat',asyncMiddleware(tailorController.get_chat));
router.get('/get_chat_get/:senderId/:recieverId',asyncMiddleware(tailorController.get_chat_get));

module.exports = router;