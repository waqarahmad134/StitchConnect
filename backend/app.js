require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const bodyParser = require("body-parser");
const cors = require("cors");
const error = require("./middlewares/error");
const userRoute = require("./routes/FrontSite/user");
const AdminRoute = require("./routes/Admin/admin");
const tailorRoute = require("./routes/FrontSite/tailor");
const shopRoute = require("./routes/FrontSite/shop");

app.use(cors());

app.use(express.json());

//for form data and multipart data
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());


app.use("/user", userRoute);
app.use("/tailor", tailorRoute);
app.use("/shop", shopRoute);
app.use("/admin", AdminRoute);
app.get("/", (req, res, next) => {
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
 });

// Error middleware : To show any error if promise fails
app.use(error);
// To make the folder Public
app.use("/public", express.static("./public"));
// Initializing Server along with creating all the tables that exist in the models folder
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Starting the server at port ${process.env.PORT} ...`);
  });
});
