const { syncIndexes } = require("../models/Blog");
const blogModel = require("../models/Blog");
const AboutModel = require("../models/about");
const CategoryModel = require("../models/category");
const AdminModel = require("../models/admin");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class FrontController {
  static home = async (req, res) => {
    const data = await blogModel.find().sort({ _id: -1 }).limit(6);
    // console.log(data);
    // res.send('hello home')
    res.render("home", { d: data });
  };

  static about = async (req, res) => {
    const data = await AboutModel.find();
    // console.log(data);
    res.render("about", { d: data });
  };

  static contact = (req, res) => {
    res.render("contact");
  };
  static blog = async (req, res) => {
    const result = await blogModel.find();
    res.render("blog", { r: result });
  };

  static readmore = (req, res) => {
    res.render("readmore");
  };

  static blogdetail = async (req, res) => {
    try {
      const category = await CategoryModel.find().sort({ _id: -1 }).limit(6);
      const recentblog = await blogModel.find().sort({ _id: -1 }).limit(6);
      const result = await blogModel.findById(req.params.id);
      // console.log(result);
      res.render("blogdetail", {
        r: result,
        recentblog: recentblog,
        cat: category,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //admin login

  static login = async (req, res) => {
    res.render("login", {
      message: req.flash("success"),
      message1: req.flash("error"),
    });
  };
  static adminregister = async (req, res) => {
    res.render("register", { message: req.flash("error") });
  };
  static admininsert = async (req, res) => {
    try {
      // console.log(req.body);
      const { name, email, password, cpassword } = req.body;
      const admin = await AdminModel.findOne({ email: email });
      if (admin) {
        req.flash("error", "email already exists! ");
        res.redirect("/register");
      } else {
        if (name && email && password && cpassword) {
          if (password == cpassword) {
            try {
              const hashpassword = await bcrypt.hash(password, 10);
              const result = new AdminModel({
                name: name,
                email: email,
                password: hashpassword,
              });
              await result.save();
              req.flash("success", "registration sucessful :)");
              res.redirect("/login");
            } catch (err) {
              console.log(err);
            }
          } else {
            req.flash("error", "password and confirm password doesnt match!");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "all fields are required");
          res.redirect("/register");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      if (email && password) {
        const admin = await AdminModel.findOne({ email: email });
        if (admin != null) {
          const ismatched = await bcrypt.compare(password, admin.password);
          if (admin.email == email && ismatched) {
            if (admin.role == "user") {
              const token = jwt.sign({ id: admin._id }, "vishalbhagat2002");
              res.cookie("token", token);
              res.redirect("/");
            }
            if (admin.role == "admin") {
              const token = jwt.sign({ id: admin._id }, "vishalbhagat2002");
              res.cookie("token", token);
              res.redirect("/admin/dashboard");
            }
          } else {
            req.flash("error", "email or password not matched");
            res.redirect("/login");
          }
        } else {
          req.flash("error", "You are not registered");
          res.redirect("/login");
        }
      } else {
        req.flash("error", "All Fields are required");
        res.redirect("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/login");
    } catch (err) {
      console.log(err);
    }
  };

  static registerform = async (req, res) => {
    try {
      res.render("reg");
    } catch (err) {}
  };
}
module.exports = FrontController;
