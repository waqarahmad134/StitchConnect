const {
  User,
  Product,
  ProductCategory,
  Order,
  OrderItem,
  Image,
} = require("../../models");
const ApiResponse = require("../../helper/ApiResponse");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

async function login(req, res) {
  const { email, password, deviceToken } = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (user) {
    if (user.status == 0) {
      const response = ApiResponse("0", "Sorry! Admin blocked!", {});
      return res.json(response);
    }
    // if (user.userType === "User") {
    //   const response = ApiResponse("0", "You are not admin!", {});
    //   return res.json(response);
    // }

    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const accessToken = sign(
        { email: user.email, id: user.id },
        process.env.JWT_ACCESS_SECRET
      );
      user.deviceToken = deviceToken;
      await user.save();
      let data = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accessToken: accessToken,
        userType: user.userType,
      };
      const response = ApiResponse("1", "Login Successfully!", data);
      return res.json(response);
    } else {
      const response = ApiResponse("0", "Incorrect Username or Password!", {});
      return res.json(response);
    }
  } else {
    const response = ApiResponse("0", "User not exist", {});
    return res.json(response);
  }
}

async function get_products(req, res) {
  let data = await Product.findAll({});
  let response = ApiResponse("1", "Products", { data });
  return res.json(response);
}

async function addProduct(req, res) {
  const { title, price, type , color , description, ProductCategoryId, UserId, isFeatured , status , userType } = req.body;
  try {
    const productImage = req.files.image[0].path;
    const imagePath = productImage.replace(/\\/g, "/");
    const product = new Product({
      title,
      price,
      type,
      color,
      userType,
      description,
      ProductCategoryId : ProductCategoryId ? ProductCategoryId : null ,
      UserId,
      isFeatured,
      image: imagePath,
      status : status,
    });
    const savedProduct = await product.save();
    const images = req.files.images.map((file) => ({
      ProductId: savedProduct.id,
      status: true,
      image: file.path.replace(/\\/g, "/"),
    }));

    // Saving the images using bulkCreate
    await Image.bulkCreate(images);

    const response = ApiResponse("1", "Product added successfully", {});
    return res.json(response);
  } catch (error) {
    const response = ApiResponse("0", error.message, {});
    return res.json(response);
  }
}

async function product_categories(req, res) {
  let data = await ProductCategory.findAll({});
  let response = ApiResponse("1", "Products", { data });
  return res.json(response);
}

async function get_all(req, res) {
  let data = await User.findAll({
    where: {
      userType: ["tailor", "shop" , "admin"],
    },
  });
  let response = ApiResponse("1", "All Users", { data });
  return res.json(response);
}

async function addProductCategories(req, res) {
  const { title } = req.body;
  const checkTitle = await ProductCategory.findOne({ where: { title: title } });
  if (checkTitle) {
    const response = ApiResponse("0", "Product Category Already Exist", {});
    return res.json(response);
  } else {
    const productCategory = new ProductCategory();
    productCategory.title = title;
    productCategory.status = 1;
    productCategory
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
async function editProductCategories(req, res) {
  const { id, title } = req.body;
  try {
    const existingCategory = await ProductCategory.findOne({
      where: { id: id },
    });
    if (!existingCategory) {
      const response = ApiResponse("0", "Product Category Not Found", {});
      return res.json(response);
    }
    const checkTitle = await ProductCategory.findOne({
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

async function get_orders(req, res) {
  let data = await Order.findAll({ include: { model: User } });
  let response = ApiResponse("1", "Products", { data });
  return res.json(response);
}
async function get_tailors(req, res) {
  let data = await User.findAll({
    where: { userType: "tailor" },
    attributes: [
      "id",
      "email",
      "name",
      "status",
      "phone",
      "createdAt",
      "image",
    ],
  });
  let response = ApiResponse("1", "Products", { data });
  return res.json(response);
}
async function get_shops(req, res) {
  let data = await User.findAll({
    where: { userType: "shop" },
    attributes: [
      "id",
      "email",
      "name",
      "status",
      "phone",
      "createdAt",
      "image",
    ],
  });
  let response = ApiResponse("1", "Products", { data });
  return res.json(response);
}
async function get_users(req, res) {
  let data = await User.findAll({
    where: { userType: "user" },
    attributes: [
      "id",
      "email",
      "name",
      "status",
      "phone",
      "createdAt",
      "image",
    ],
  });
  let response = ApiResponse("1", "Products", { data });
  return res.json(response);
}

async function updateStatus(req, res) {
  const userId = req.params.userId;
  let user = await User.findOne({ where: { id: userId } });
  User.update({ status: !user.status }, { where: { id: userId } })
    .then((upData) => {
      const response = ApiResponse(
        "1",
        `User ${!user.status === true ? "Active" : "Block"} Sucessfully`,
        upData,
        {}
      );
      return res.json(response);
    })
    .catch((error) => {
      const response = ApiResponse("0", error.message, {});
      return res.json(response);
    });
}
async function updateProductStatus(req, res) {
  const prodId = req.params.prodId;
  let prod = await Product.findOne({ where: { id: prodId } });
  Product.update({ status: !prod.status }, { where: { id: prodId } })
    .then((upData) => {
      const response = ApiResponse(
        "1",
        `Product ${!prod.status === true ? "Active" : "Block"} Sucessfully`,
        upData,
        {}
      );
      return res.json(response);
    })
    .catch((error) => {
      const response = ApiResponse("0", error.message, {});
      return res.json(response);
    });
}
async function updateFeatured(req, res) {
  const prodId = req.params.prodId;
  try {
    let prod = await Product.findOne({ where: { id: prodId } });
    prod.isFeatured = !prod.isFeatured;
    prod
      .save()
      .then((dd) => {
        const response = ApiResponse(
          "1",
          `Updated ${
            data.isFeatured === true ? "Featured" : "UnFeatured"
          } Sucesssfully`,
          ""
        );
        return res.json(response);
      })
      .catch((error) => {
        const response = ApiResponse("0", error.message, {});
        return res.json(response);
      });
    let data = await prod.save();
  } catch (error) {
    const response = ApiResponse("0", error.message, {});
    return res.json(response);
  }
}

async function updatePCStatus(req, res) {
  const pcId = req.params.pcId;
  try {
    let prod = await ProductCategory.findOne({ where: { id: pcId } });
    prod.status = !prod.status;
    let data = await prod.save();
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

async function deletePC(req, res) {
  const pcId = req.params.pcId;
  // return res.json(pcId);
  try {
    const pc = await ProductCategory.findByPk(pcId);
    await pc.destroy();
    const response = ApiResponse("1", "Deleted Sucessfuly", {});
    return res.json(response);
  } catch (error) {
    const response = ApiResponse("0", error.message, {});
    return res.json(response);
  }
}
async function deleteUser(req, res) {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      const response = ApiResponse("1", "User Not Found", {});
      return res.json(response);
    }
    await user.destroy();
    const response = ApiResponse("1", "Deleted Sucessfuly", {});
    return res.json(response);
  } catch (error) {
    const response = ApiResponse("0", error.message, {});
    return res.json(response);
  }
}

module.exports = {
  login,
  get_products,
  product_categories,
  addProductCategories,
  editProductCategories,
  get_orders,
  get_tailors,
  get_shops,
  get_users,
  updateStatus,
  updateProductStatus,
  updatePCStatus,
  deletePC,
  deleteUser,
  updateFeatured,
  addProduct,
  get_all,
};
