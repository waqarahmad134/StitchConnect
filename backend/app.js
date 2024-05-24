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
const path = require('path');

app.use(cors());

app.use(express.json());

//for form data and multipart data
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());


app.use("/user", userRoute);
app.use("/tailor", tailorRoute);
app.use("/shop", shopRoute);
app.use("/admin", AdminRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'loaderio-b922b3f2b76c436b55bead8ffa707595.txt'));
});
app.get('/loaderio-b922b3f2b76c436b55bead8ffa707595.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'loaderio-b922b3f2b76c436b55bead8ffa707595.txt'));
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
