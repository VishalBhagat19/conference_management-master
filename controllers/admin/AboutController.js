const AboutModel = require("../../models/about");
class AboutController {
  static about = async (req, res) => {
    const result = await AboutModel.find();
    res.render("admin/about/display", { c: result });
  };
  static aboutview = async (req, res) => {
    try {
      const result = new AboutModel({
        content: req.body.content,
      });
      await result.save();
      res.redirect("/about");
    } catch (err) {
      console.log(err);
    }
  };

  static aboutedit = async (req, res) => {
    try {
      const result = await AboutModel.find();
      res.render("admin/about/aboutedit", { c: result });
    } catch (err) {
      console.log(err);
    }
  };
  static aboutupdate = async (req, res) => {
    try {
      const data = await AboutModel.findOneAndUpdate({
        content: req.body.content,
      });
      await data.save();
      res.redirect("/admin/about");
    } catch (err) {
      console.log(err);
    }
  };
}
module.exports = AboutController;
