const express = require("express");
const router = express();
const multer = require("multer");
const path = require("path");
const shopController = require("../../controllers/FrontSite/shopController");

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
  shopController.registration
);
router.post("/login", shopController.login);

module.exports = router;
