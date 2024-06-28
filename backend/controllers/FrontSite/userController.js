const {
  User,
  OtpData,
  UserProfile,
  PlanDietition,
  Plan,
  BlackList,
  Review,
  Service,
  Time,
  UserPlan,
  Category,
  Contact,
} = require("../../models");
const ApiResponse = require("../../helper/ApiResponse");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const sentOtpMail = require("../../helper/sentOtpMail");
var otp = require("otpauth");
const Sequelize = require("sequelize");
const { options } = require("../../routes/FrontSite/user");

let totp = new otp.TOTP({
  issuer: "ACME",
  label: "AzureDiamond",
  algorithm: "SHA1",
  digits: 4,
  period: 30,
  secret: "NB2W45DFOIZA", // or "OTPAuth.Secret.fromBase32('NB2W45DFOIZA')"
});

async function dietition_login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: [{ email: email }, { userType: "Dietition" }],
  });

  if (user) {
    if (user.status == 0) {
      const response = ApiResponse("0", "Sorry! Dietition blocked!", {});
      return res.json(response);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const accessToken = sign(
        { email: user.email, id: user.id },
        process.env.JWT_ACCESS_SECRET
      );
      let dietitionPlans = await UserPlan.findAll({
        where: { DeititionId: user.id },
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName", "email", "phone"],
          },
          {
            model: Plan,
            attributes: ["id", "title", "shortDescription", "longDescription"],
          },
        ],
      });

      let data = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accessToken: accessToken,
        dietitionPlans,
      };
      const response = ApiResponse("1", "Login Successfully!", data);
      return res.json(response);
    } else {
      const response = ApiResponse("0", "Incorrect Username or Password!", {});
      return res.json(response);
    }
  } else {
    const response = ApiResponse("0", "Dietition not exist", {});
    return res.json(response);
  }
}

async function update_dietition_link(req, res) {
  const { userPlanId, links, userId } = req.body;
  const data = await UserPlan.findOne({
    where: [{ id: userPlanId }, { DeititionId: userId }],
  });

  if (data) {
    for (const link of links) {
      let time = await Time.findOne({
        where: [{ PlanId: data.PlanId }, { day: link.day }],
      });
      if (time) {
        time.dietitionLink = link.link;
        await time.save();
      }
    }
    let response = ApiResponse("1", "Link Updated successfully", {});
    return res.json(response);
  } else {
    let response = ApiResponse("0", "Not found", {});
    return res.json(response);
  }
}
async function update_trainer_link(req, res) {
  const { userPlanId, links, userId } = req.body;
  const data = await UserPlan.findOne({
    where: [{ id: userPlanId }, { TrainerId: userId }],
  });

  if (data) {
    for (const link of links) {
      let time = await Time.findOne({
        where: [{ PlanId: data.PlanId }, { day: link.day }],
      });
      if (time) {
        time.trainerLink = link.link;
        await time.save();
      }
    }
    let response = ApiResponse("1", "Link Updated successfully", {});
    return res.json(response);
  } else {
    let response = ApiResponse("0", "Not found", {});
    return res.json(response);
  }
}

async function trainer_login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: [{ email: email }, { userType: "Trainer" }],
  });

  if (user) {
    if (user.status == 0) {
      const response = ApiResponse("0", "Sorry! Dietition blocked!", {});
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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accessToken: accessToken,
      };
      const response = ApiResponse("1", "Login Successfully!", data);
      return res.json(response);
    } else {
      const response = ApiResponse("0", "Incorrect Username or Password!", {});
      return res.json(response);
    }
  } else {
    const response = ApiResponse("0", "Dietition not exist", {});
    return res.json(response);
  }
}

async function dietition_get_all_users(req, res) {
  const plans = await UserPlan.findAll({
    include: [
      { model: Plan },
      { model: User, attributes: ["id", "firstName", "lastName", "email"] },
    ],
  });
  const response = ApiResponse("1", "All Plans", { plans: plans });
  return res.json(response);
}

async function registration(req, res) {
  const {
    name,
    email,
    password,
    address,
  } = req.body;
  const checkEmail = await User.findOne({ where: { email: email } });
  if (checkEmail) {
    const response = ApiResponse("0", "Email already exist", {});
    return res.json(response);
  } else {
    const salt = await bcrypt.genSalt(10);
    const user = new User();
    user.name = name;
    user.email = email;
    user.address = address;
    user.userType = "user";
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
          email: dat.email,
          accessToken: accessToken,
        };

        const response = ApiResponse(
          "1",
          `User Registered successfully!`,
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
async function logout(req, res) {
  const blacklist = await BlackList.findOne({
    where: { accessToken: req.body.accessToken },
  });
  if (!blacklist) {
    const newblacklist = new BlackList();
    newblacklist.accessToken = req.body.accessToken;
    newblacklist
      .save()
      .then((dat) => {
        const response = ApiResponse("1", "Logout Successfully!", {});
        return res.json(response);
      })
      .catch((error) => {
        const response = ApiResponse("0", error.message, {});
        return res.json(response);
      });
  } else {
    const response = ApiResponse("1", "Logout Successfully!", {});
    return res.json(response);
  }
}
async function change_password(req, res) {
  const { password, new_password, confirm_password } = req.body;
  const user = await User.findOne({ where: { id: req.user.id } });
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      if (new_password === confirm_password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(new_password, salt);
        user
          .save()
          .then((dat) => {
            const response = ApiResponse(
              "1",
              "Password updated successfully!",
              {}
            );
            return res.json(response);
          })
          .catch((error) => {
            const response = ApiResponse("0", error.message, {});
            return res.json(response);
          });
      } else {
        const response = ApiResponse("0", "Confirm password mismatch", {});
        return res.json(response);
      }
    } else {
      const response = ApiResponse("0", "Old password mismatch", {});
      return res.json(response);
    }
  } else {
    const response = ApiResponse("0", "User not exist!", {});
    return res.json(response);
  }
}
async function forget_password(req, res) {
  const check = await User.findOne({ where: { email: req.body.email } });
  if (check) {
    const checkotp = await OtpData.findOne({ where: { email: check.email } });
    if (checkotp) {
      let OTP = totp.generate();
      checkotp.otp = OTP;
      checkotp.requestAt = new Date();
      checkotp
        .save()
        .then((dat) => {
          console.log(dat);
          sentOtpMail(OTP, req.body.email);
          const data = {
            email: check.email,
            otp: dat.otp,
          };
          const response = ApiResponse("1", "Opt Sent Successfully!", data);
          return res.json(response);
        })
        .catch((error) => {
          const response = ApiResponse("0", error.message, {});
          return res.json(response);
        });
    } else {
      let OTP = totp.generate();
      const newOtp = new OtpData();
      newOtp.requestAt = new Date();
      newOtp.email = check.email;
      newOtp.otp = OTP;
      newOtp.status = true;
      newOtp
        .save()
        .then((dat) => {
          sentOtpMail(OTP, req.body.email);
          const data = {
            email: check.email,
            otp: dat.otp,
          };
          const response = ApiResponse("1", "Opt Sent Successfully!", data);
          return res.json(response);
        })
        .catch((error) => {
          const response = ApiResponse("0", error.message, {});
          return res.json(response);
        });
    }
  } else {
    const response = ApiResponse("0", "Sorry! User not exist", {});
    return res.json(response);
  }
}
async function change_password_after_otp(req, res) {
  const {  password, otp } = req.body;
  let otpData = await OtpData.findOne({ where: { otp: otp } });
  if (otpData) {
    const user = await User.findOne({
      where: [{ email: otpData.email }, { status: true }],
    });
    if (user) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user
        .save()
        .then((dat) => {
          const response = ApiResponse(
            "1",
            "Password updated successfully!",
            {}
          );
          return res.json(response);
        })
        .catch((error) => {
          const response = ApiResponse("0", error.message, {});
          return res.json(response);
        });
    } else {
      const response = ApiResponse("0", "User not exists!", {});
      return res.json(response);
    }
  } else {
    const response = ApiResponse("0", "Invalid OTP", {});
    return res.json(response);
  }
}
async function get_profile(req, res) {
  const user = await User.findOne({
    where: { id: req.user.id },
    include: [{ model: UserPlan }],
  });

  // const schedule = await ShippingSchedule.findAll({ where: { status: true } });
  const data = {
    user: user,
    // schedule: schedule
  };
  const response = ApiResponse("1", "Profile Data", data);
  return res.json(response);
}
async function update_profile(req, res) {
  const { name , phone , productDisplay , backgroundColor , CategoryId} = req.body;
  const user = await User.findByPk(req.user.id);
  user.name = name;
  user.phone = phone;
  user.productDisplay = productDisplay;
  user.backgroundColor = backgroundColor;
  user.CategoryId = CategoryId;
 
  user
    .save()
    .then(async (dat) => {
      const response = ApiResponse("1", "Profile Updated Successfully", {});
      return res.json(response)
    })
    .catch((error) => {
      const response = ApiResponse("0", error.message, {});
      return res.json(response);
    });
}
async function get_plan_details(req, res) {
  const plan = await Plan.findOne({
    where: { id: req.params.planId },
    include: [{ model: Time }],
  });
  const response = ApiResponse("1", "Plan Details", plan);
  return res.json(response);
}
async function get_user_plans(req, res) {
  const plans = await UserPlan.findAll({
    where: [{ status: true }, { UserId: req.user.id }],
    include: [
      { model: Plan },
      {
        model: PlanDietition,
        include: [
          {
            model: User,
            as: "Dietition",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      },
    ],
  });
  const response = ApiResponse("1", "User Plans", plans);
  return res.json(response);
}

async function home(req, res) {
  const plans = await Plan.findAll({
    order: Sequelize.literal("RAND()"),
    limit: 6,
  });
  const data = {
    plans: plans,
  };
  const response = ApiResponse("1", "Home page Data", data);
  return res.json(response);
}

async function all_services(req, res) {
  const services = await Service.findAll({ where: { status: true } });
  const response = ApiResponse("1", "All Services", services);
  return res.json(response);
}

async function all_plans(req, res) {
  const cateogry = await Category.findOne({ where: { title: "Plans" } });
  const plans = await Plan.findAll({
    where: [{ status: true }, { CategoryId: cateogry.id }],
  });
  const response = ApiResponse("1", "All Plans", plans);
  return res.json(response);
}
async function workout(req, res) {
  const cateogry = await Category.findOne({ where: { title: "WorkOut" } });
  const plans = await Plan.findAll({
    where: [{ status: true }, { CategoryId: cateogry.id }],
    include: { model: Time },
  });
  const response = ApiResponse("1", "All Plans", plans);
  return res.json(response);
}

async function send_message(req, res) {
  const { firstName, lastName, subject, message, email } = req.body;
  const contact = new Contact();
  contact.firstName = firstName;
  contact.lastName = lastName;
  contact.subject = subject;
  contact.message = message;
  contact.email = email;
  contact
    .save()
    .then((dat) => {
      const response = ApiResponse("1", "Message sent successfully!", {});
      return res.json(response);
    })
    .catch((error) => {
      const response = ApiResponse("0", "Something went wrong", {});
      return res.json(response);
    });
}

module.exports = {
  registration,
  login,
  forget_password,
  change_password,
  change_password_after_otp,
  update_profile,
  get_profile,
  get_plan_details,
  get_user_plans,
  logout,
  home,
  all_services,
  all_plans,
  workout,
  send_message,

  //Dietiotns api
  dietition_login,
  trainer_login,
  dietition_get_all_users,
  update_dietition_link,
  update_trainer_link,
};
