const express = require("express");
const router = express();
const multer = require("multer");
const path = require("path");
const adminController = require("../../controllers/Admin/AdminController");
const shopController = require("../../controllers/Admin/ShopControlller");
const tailorController = require("../../controllers/Admin/TailorController");

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

router.post("/login", adminController.login);

router.get("/get_products", adminController.get_products);
router.post(
  "/addProduct",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  adminController.addProduct
);

router.get("/get_all", adminController.get_all);
// Product Categories
router.get("/product_categories", adminController.product_categories);
router.get("/updatePCStatus/:pcId", adminController.updatePCStatus);
router.post("/addProductCategories", adminController.addProductCategories);
router.put("/editProductCategories", adminController.editProductCategories);
router.delete("/deletePC/:pcId", adminController.deletePC);

// Shop Categories
router.get("/shopCategories", shopController.shopCategories);
router.get(
  "/updateShopCategoriesStatus/:Id",
  shopController.updateShopCategoriesStatus
);
router.post("/addShopCategories", shopController.addShopCategories);
router.put("/editShopCategories", shopController.editShopCategories);
router.delete("/deleteShopCategories/:Id", shopController.deleteShopCategories);

// Tailor Categories
router.get("/tailorCategories", tailorController.tailorCategories);
router.get(
  "/updateTailorCategoriesStatus/:Id",
  tailorController.updateTailorCategoriesStatus
);
router.post("/addTailorCategories", tailorController.addTailorCategories);
router.put("/editTailorCategories", tailorController.editTailorCategories);
router.delete(
  "/deleteTailorCategories/:Id",
  tailorController.deleteTailorCategories
);

router.get("/get_orders", adminController.get_orders);
router.get("/get_tailors", adminController.get_tailors);
router.get("/get_shops", adminController.get_shops);
router.get("/get_users", adminController.get_users);
router.get("/updateStatus/:userId", adminController.updateStatus);
router.get("/updateProductStatus/:prodId", adminController.updateProductStatus);
router.get("/updateFeatured/:prodId", adminController.updateFeatured);
router.get("/deleteUser/:userId", adminController.deleteUser);

module.exports = router;
