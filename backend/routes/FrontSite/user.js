const express = require("express");
const router = express();
const multer = require("multer");
const path = require("path");
const userController = require("../../controllers/FrontSite/userController");

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

router.post("/register", upload.single("image"), userController.registration);
router.post("/login", userController.login);


module.exports = router;
