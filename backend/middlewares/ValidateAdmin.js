const { verify } = require("jsonwebtoken");
const ApiResponse = require("../helper/ApiResponse");
const { BlackList, User } = require("../models");

const validateAdmin = async (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    const response = ApiResponse("0", "User not loggedIn!", {});
    return res.json(response);
  }
  const validToken = verify(accessToken, process.env.JWT_ACCESS_SECRET);
  req.user = validToken;
  const user = await User.findOne({ where: { id: req.user.id } });
  if (user.userType !== "User") {
    if (validToken) return next();
  } else {
    const response = ApiResponse("0", "You are not authorized!", {});
    return res.json(response);
  }
};

module.exports = { validateAdmin };
