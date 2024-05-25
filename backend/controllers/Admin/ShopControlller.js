const {
  User,
  Product,
  ProductCategory,
  Order,
  OrderItem,
  ShopCategory,
  Image,
} = require("../../models");
const ApiResponse = require("../../helper/ApiResponse");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

async function shopCategories(req, res) {
  let data = await ShopCategory.findAll({});
  let response = ApiResponse("1", "Products", { data });
  return res.json(response);
}

async function addShopCategories(req, res) {
  const { title } = req.body;
  const checkTitle = await ShopCategory.findOne({ where: { title: title } });
  if (checkTitle) {
    const response = ApiResponse("0", "Category Already Exist", {});
    return res.json(response);
  } else {
    const shopCategory = new ShopCategory();
    shopCategory.title = title;
    shopCategory.status = 1;
    shopCategory
      .save()
      .then(async (dat) => {
        let data = {
          id: dat.id,
          title: dat.title,
        };

        const response = ApiResponse(
          "1",
          `Product Category Added Successfully!`,
          data
        );
        return res.json(response);
      })
      .catch((error) => {
        const response = ApiResponse("0", error.message, {});
        return res.json(response);
      });
  }
}

async function editShopCategories(req, res) {
    const { id, title } = req.body;
    try {
      const existingCategory = await ShopCategory.findOne({
        where: { id: id },
      });
      if (!existingCategory) {
        const response = ApiResponse("0", "Product Category Not Found", {});
        return res.json(response);
      }
      const checkTitle = await ShopCategory.findOne({
        where: { title: title },
      });
      if (checkTitle && checkTitle.id !== id) {
        const response = ApiResponse("0", "Product Category Already Exist", {});
        return res.json(response);
      }
      existingCategory.title = title;
      await existingCategory.save();
      const data = {
        id: existingCategory.id,
        title: existingCategory.title,
      };
  
      const response = ApiResponse(
        "1",
        "Product Category Updated Successfully!",
        data
      );
      return res.json(response);
    } catch (error) {
      const response = ApiResponse("0", error.message, {});
      return res.json(response);
    }
  }

  async function deleteShopCategories(req, res) {
    const shopId = req.params.Id;
    // return res.json(pcId);
    try {
      const shop = await ShopCategory.findByPk(shopId);
      await shop.destroy();
      const response = ApiResponse("1", "Deleted Sucessfuly", {});
      return res.json(response);
    } catch (error) {
      const response = ApiResponse("0", error.message, {});
      return res.json(response);
    }
  }


  async function updateShopCategoriesStatus(req, res) {
    const shopId = req.params.Id;
    try {
      let shop = await ShopCategory.findOne({ where: { id: shopId } });
      shop.status = !shop.status;
      let data = await shop.save();
      const response = ApiResponse(
        "1",
        `Updated ${data.status === true ? "Active" : "Block"} Sucesssfully`,
        data
      );
      return res.json(response);
    } catch (error) {
      const response = ApiResponse("0", error.message, {});
      return res.json(response);
    }
  }
module.exports = {
  shopCategories,
  addShopCategories,
  editShopCategories,
  deleteShopCategories,
  updateShopCategoriesStatus,
};
