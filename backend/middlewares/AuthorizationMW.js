const { verify } = require("jsonwebtoken");
const ApiResponse = require("../helper/ApiResponse");


const validateToken = async (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    const response = ApiResponse("0", "User not loggedIn!", {});
    return res.json(response);
  }
   try {
          const validToken = verify(accessToken, process.env.JWT_ACCESS_SECRET);
          req.user = validToken;

          if (validToken) {
            return next();
          }
        } catch (err) {
          const response = ApiResponse("0", "Invalid accessToken!", {});
          return res.json(response);
        }

};

module.exports = { validateToken };
