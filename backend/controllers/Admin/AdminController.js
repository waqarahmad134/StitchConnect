const {
  User,
Product,
ProductCategory,
Order
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

async function get_products(req,res){
  let data = await Product.findAll({});
  let response = ApiResponse("1","Products",{data});
  return res.json(response);
}
async function product_categories(req,res){
  let data = await ProductCategory.findAll({});
  let response = ApiResponse("1","Products",{data});
  return res.json(response);
}
async function get_orders(req,res){
  let data = await Order.findAll({include:{model:User,attributes:['id','name']}});
  let response = ApiResponse("1","Products",{data});
  return res.json(response);
}
async function get_tailors(req,res){
  let data = await User.findAll({where:{userType:"tailor"},attributes:['id','email','name','phone','createdAt','image']});
  let response = ApiResponse("1","Products",{data});
  return res.json(response);
}
async function get_shops(req,res){
  let data = await User.findAll({where:{userType:"shop"},attributes:['id','email','name','phone','createdAt','image']});
  let response = ApiResponse("1","Products",{data});
  return res.json(response);
}
async function get_users(req,res){
  let data = await User.findAll({where:{userType:"user"},attributes:['id','email','name','phone','createdAt','image']});
  let response = ApiResponse("1","Products",{data});
  return res.json(response);
}


module.exports = {
 
  login,
  get_products,
  product_categories,
  get_orders,
  get_tailors,
  get_shops,
  get_users
 
};
