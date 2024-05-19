const ApiResponse = require("../helper/ApiResponse");
module.exports = function (err, req, res, next) {
  const value = ApiResponse("0", err.message.replaceAll('"', ""), {});
  return res.json(value);
};
