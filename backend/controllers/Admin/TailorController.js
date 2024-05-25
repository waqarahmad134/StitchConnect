const { TailorCategory } = require("../../models");
const ApiResponse = require("../../helper/ApiResponse");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

async function tailorCategories(req, res) {
  let data = await TailorCategory.findAll({});
  let response = ApiResponse("1", "Products", { data });
  return res.json(response);
}

async function addTailorCategories(req, res) {
  const { title } = req.body;
  const checkTitle = await TailorCategory.findOne({ where: { title: title } });
  if (checkTitle) {
    const response = ApiResponse("0", "Category Already Exist", {});
    return res.json(response);
  } else {
    const newData = new TailorCategory();
    newData.title = title;
    newData.status = 1;
    newData
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

async function editTailorCategories(req, res) {
  const { id, title } = req.body;
  try {
    const existingCategory = await TailorCategory.findOne({
      where: { id: id },
    });
    if (!existingCategory) {
      const response = ApiResponse("0", "Product Category Not Found", {});
      return res.json(response);
    }
    const checkTitle = await TailorCategory.findOne({
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

async function deleteTailorCategories(req, res) {
  const shopId = req.params.Id;
  // return res.json(pcId);
  try {
    const shop = await TailorCategory.findByPk(shopId);
    await shop.destroy();
    const response = ApiResponse("1", "Deleted Sucessfuly", {});
    return res.json(response);
  } catch (error) {
    const response = ApiResponse("0", error.message, {});
    return res.json(response);
  }
}

async function updateTailorCategoriesStatus(req, res) {
  const shopId = req.params.Id;
  try {
    let shop = await TailorCategory.findOne({ where: { id: shopId } });
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
  tailorCategories,
  addTailorCategories,
  editTailorCategories,
  deleteTailorCategories,
  updateTailorCategoriesStatus,
};
