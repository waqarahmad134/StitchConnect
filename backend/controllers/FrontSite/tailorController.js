const {
  User,
  Product,
  Color,
  Image,
  ShopCategory,
  Order,
  Chat,
  OrderItem,
  ProductCategory,
} = require("../../models");
const ApiResponse = require("../../helper/ApiResponse");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const sentOtpMail = require("../../helper/sentOtpMail");
var otp = require("otpauth");
const Sequelize = require("sequelize");
const { options } = require("../../routes/FrontSite/user");
const { Op } = require("sequelize"); // Import Sequelize operators
const stripe = require("stripe")(process.env.STRIPE_KEY);
let totp = new otp.TOTP({
  issuer: "ACME",
  label: "AzureDiamond",
  algorithm: "SHA1",
  digits: 4,
  period: 30,
  secret: "NB2W45DFOIZA", // or "OTPAuth.Secret.fromBase32('NB2W45DFOIZA')"
});

async function registration(req, res) {
  const {
    name,
    email,
    phone,
    password,
    address,
    description,
    lat,
    lng,
    userType,
  } = req.body;
  const checkEmail = await User.findOne({ where: { email: email } });
  const checkPhone = await User.findOne({ where: { phone: phone } });
  if (checkEmail) {
    const response = ApiResponse("0", "Email already exist", {});
    return res.json(response);
  } else if (checkPhone) {
    const response = ApiResponse("0", "Phone No. already exist", {});
    return res.json(response);
  } else {
    const salt = await bcrypt.genSalt(10);

    const user = new User();
    user.name = name;
    user.description = description;
    user.address = address;
    user.lat = lat;
    user.lng = lng;
    user.email = email;
    user.phone = phone;

    user.userType = userType;
    user.status = 1;
    user.password = await bcrypt.hash(password, salt);

    const service_image = req.file;
    let tmpPath = service_image.path;
    let imagePath = tmpPath.replace(/\\/g, "/");

    user.image = imagePath;

    user
      .save()
      .then(async (dat) => {
        const accessToken = sign(
          { email: user.email, id: user.id },
          process.env.JWT_ACCESS_SECRET
        );
        let data = {
          id: dat.id,
          name: dat.name,
          phone: dat.phone,
          email: dat.email,
          accessToken: accessToken,
        };

        const response = ApiResponse(
          "1",
          `${userType} Registered successfully!`,
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
async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: [{ email: email }],
  });

  if (user) {
    if (user.status == 0) {
      const response = ApiResponse("0", "Sorry! User blocked!", {});
      return res.json(response);
    }
    if (user.userType != process.env.TAILOR) {
      const response = ApiResponse("0", "You are not authorized", {});
      return res.json(response);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const accessToken = sign(
        { email: user.email, id: user.id },
        process.env.JWT_ACCESS_SECRET
      );
      let data = {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        userType: user.userType,
        accessToken: accessToken,
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
async function all_products(req, res) {
  let categories = await ProductCategory.findAll({
    where: { userType: process.env.SHOP },
    attributes: ["id", "title"],
  });
  let data = await Product.findAll({
    include: [
      { model: Color, attributes: ["color"] },
      { model: Image, attributes: ["image"] },
      { model: ProductCategory, attributes: ["id", "title"] },
    ],
  });
  let response = ApiResponse("1", "All Products", { data: data , categories });
  return res.json(response);
}
async function featured_products(req,res){
  let data = await Product.findAll({where:{isFeatured:true}});
  let response = ApiResponse("1","Data",{data});
  return res.json(response);
}
async function tailor_products(req, res) {
  let categories = await ProductCategory.findAll({
    where: { userType: process.env.TAILOR },
    attributes: ["id", "title"],
  });
  let data = await Product.findAll({
    include: [
      { model: User, where: { userType: process.env.TAILOR } },
      { model: Color, attributes: ["color"] },
      { model: Image, attributes: ["image"] },
      { model: ProductCategory, attributes: ["id", "title"] },
    ],
  });
  let response = ApiResponse("1", "All Products", { data: data, categories });
  return res.json(response);
}
async function shop_products(req, res) {
  let categories = await ProductCategory.findAll({
    where: { userType: process.env.SHOP },
    attributes: ["id", "title"],
  });
  let data = await Product.findAll({
    include: [
      { model: User, where: { userType: process.env.SHOP } },
      { model: Color, attributes: ["color"] },
      { model: Image, attributes: ["image"] },
      { model: ProductCategory, attributes: ["id", "title"] },
    ],
  });
  let response = ApiResponse("1", "All Products", { data: data, categories });
  return res.json(response);
}
async function product_details(req, res) {
  let productId = req.params.productId;

  let data = await Product.findOne({
    where: { id: productId },
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: Color, attributes: ["color"] },
      { model: Image, attributes: ["image"] },
      { model: ProductCategory, attributes: ["id", "title"] },
    ],
  });
  let related = await Product.findAll({
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: Color, attributes: ["color"] },
      { model: Image, attributes: ["image"] },
      { model: ProductCategory, attributes: ["id", "title"] },
    ],
    order: Sequelize.literal("RAND()"),
    limit: 3,
  });
  let response = ApiResponse("1", "Product Details", { data, related });
  return res.json(response);
}
async function search_products(req, res) {
  const { title } = req.body;
  try {
    let data = await Product.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`, // Use % for partial matching
        },
      },
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Color, attributes: ["color"] },
        { model: Image, attributes: ["image"] },
        { model: ProductCategory, attributes: ["id", "title"] },
      ],
    });

    let response = ApiResponse("1", "Products", { data });
    return res.json(response);
  } catch (error) {
    console.error(error);
    let response = ApiResponse("0", "Error retrieving products", {});
    return res.status(500).json(response);
  }
}
async function get_all_shops(req, res) {
  let data = await User.findAll({ where: { userType: "shop", status: true } });
  let categories = await ShopCategory.findAll({ where: { status: true } });
  let response = ApiResponse("1", "All Shops", { data, categories });
  return res.json(response);
}
async function shop_details(req, res) {
  const shopId = req.params.shopId;
  // return res.json(shopId)
  let products = await Product.findAll({ UserId: shopId });
  let categories = await ProductCategory.findAll({ where: { UserId: shopId } });
  let response = ApiResponse("1", "shop details", {
    data: products,
    categories,
  });
  return res.json(response);
}
async function get_profile(req, res) {
  const userId = req.params.userId;
  let data = await User.findOne({
    where: { id: userId },
    include: [{ model: Product, attributes: ["title", "image"] }],
  });
  let response = ApiResponse("1", "Profile", { data });
  return res.json(response);
}
async function place_order(req, res) {
  const { price, userId, products } = req.body;

  try {
    // Step 1: Create the order in your database
    let order = new Order();
    order.price = price;
    order.UserId = userId;
    order.status = "placed";

    let savedOrder = await order.save();

    // Step 2: Save each order item in the database
    for (const product of products) {
      let item = new OrderItem();
      item.productId = product.productId;
      item.qty = product.qty;
      item.price = product.price;
      item.color = product.color;
      item.OrderId = savedOrder.id;
      await item.save();
    }

    // Step 3: Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100, // price in cents
        },
        quantity: product.qty,
      })),
      mode: "payment",
      success_url: `http://localhost:5173/success/${order.id}`,
      cancel_url: `http://localhost:5173/cancel`,
    });

    // Step 4: Return the session URL in the response
    let response = ApiResponse("1", "Order Placed successfully", {
      savedOrder,
      sessionUrl: session.url,
    });
    return res.json(response);
  } catch (error) {
    let response = ApiResponse("0", error.message, {});
    return res.json(response);
  }
}
async function after_payment(req, res) {
  let order = await Order.findOne({ where: { id: req.params.orderId } });
  if (order) {
    order.paymentStatus = true;
    order
      .save()
      .then((dat) => {
        let response = ApiResponse("1", "Placed Successfully", {});
        return res.json(response);
      })
      .catch((error) => {
        let response = ApiResponse("0", error.message, {});
        return res.json(response);
      });
  }
}
async function send_message(req, res) {
  const { message, senderId, recieverId } = req.body;
  let chat = new Chat();
  chat.message = message;
  chat.senderId = senderId;
  chat.status = true;
  chat.recieverId = recieverId;
  chat
    .save()
    .then((dat) => {
      let response = ApiResponse("1", "Message send", {});
      return res.json(response);
    })
    .catch((error) => {
      let response = ApiResponse("0", error.message, {});
      return res.json(response);
    });
}
async function get_users(req,res){
  let data = await User.findAll({attributes:['id','email','name']});
  let response = ApiResponse("1","All Users",{data});
  return res.json(response);
}
async function get_chat(req,res){
  const { senderId, recieverId } = req.body;
  const data = await Chat.findAll({
    where: {
      [Sequelize.Op.or]: [
        { senderId: senderId, recieverId: recieverId },
        { senderId: recieverId, recieverId: senderId }
      ]
    }
  });
  let response = ApiResponse("1","Chat",{data});
  return res.json(response)
}
async function get_chat_get(req,res){
  const { senderId, recieverId } = req.params;
  const data = await Chat.findAll({
    where: {
      [Sequelize.Op.or]: [
        { senderId: senderId, recieverId: recieverId },
        { senderId: recieverId, recieverId: senderId }
      ]
    }
  });
  let response = ApiResponse("1","Chat",{data});
  return res.json(response)
}

module.exports = {
  registration,
  login,
  all_products,
  featured_products,
  tailor_products,
  shop_products,
  product_details,
  search_products,
  get_all_shops,
  shop_details,
  get_profile,
  place_order,
  after_payment,
  send_message,
  get_users,
  get_chat,
  get_chat_get
  
};
