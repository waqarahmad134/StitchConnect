const express = require("express");
const router = express();
const multer = require("multer");
const path = require("path");
const tailorController = require("../../controllers/FrontSite/tailorController");

let x = 1;
const uploadimage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/images`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Math.floor(Math.random() * 1000000000) +
        "-" +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: uploadimage,
});

router.post(
  "/registration",
  upload.single("image"),
  tailorController.registration
);
router.post("/login", tailorController.login);



// Homepage API of Front 
router.get("/admin_products", tailorController.admin_products);
router.get("/featured_products", tailorController.featured_products);
router.get("/shop_products", tailorController.shop_products);

// Search From Home Page 
router.post("/search_products", tailorController.search_products);

// Main Shop and Tailor Page Api respectively
router.get("/get_all_shops", tailorController.get_all_shops);
router.get("/get_all_tailors", tailorController.get_all_tailors);


router.get("/product_details/:productId", tailorController.product_details);
router.get("/shop_details/:shopId", tailorController.shop_details);
router.get("/tailor_details/:tailorId", tailorController.tailor_details);
// router.get("/profile/:userId", tailorController.profile);

// Order scenario 
router.post("/place_order", tailorController.place_order);
router.get("/after_payment/:orderId", tailorController.after_payment);


// Message API which is used in Contact us page 
router.post("/send_message", tailorController.send_message);
router.get("/get_users", tailorController.get_users);
router.post("/get_chat", tailorController.get_chat);
router.get("/get_chat_get/:senderId/:recieverId",tailorController.get_chat_get);

module.exports = router;
