const express = require("express");
const router = express();
const multer = require("multer");
const path = require("path");
const { validateToken } = require("../../middlewares/AuthorizationMW");
const asyncMiddleware = require("../../middlewares/async");
const adminController = require("../../controllers/Admin/AdminController");
let x = 1;


router.post("/registration", asyncMiddleware(adminController.registration));
router.get("/get_products", asyncMiddleware(adminController.get_products));
router.get("/product_categories", asyncMiddleware(adminController.product_categories));
router.get("/get_orders", asyncMiddleware(adminController.get_orders));
router.get("/get_tailors", asyncMiddleware(adminController.get_tailors));
router.get("/get_shops", asyncMiddleware(adminController.get_shops));
router.get("/get_users", asyncMiddleware(adminController.get_users));


module.exports = router;
