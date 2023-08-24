const { findById } = require('../../models/category')
const CategoryModel = require("../../models/category");
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: "df0jht2dd",
  api_key: "299132352993518",
  api_secret: "p-ZFBgMJu9iAunrDnsJF5i9s2tY",
  secure: false
});



class CategoryController {
  static category = async (req, res) => {
    try {
      const data = await CategoryModel.find();
      // console.log(data)
      res.render("admin/category/category", { d: data });
    } catch (err) {
      console.log(err);
    }
  };
  static categoryinsert = async (req, res) => {
    const file = req.files.image
    const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'category_image'
    })
    try {
      const result = new CategoryModel({
        title: req.body.title,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url
        }
      })
      await result.save(
        res.redirect('/admin/category')
      )
    } catch (err) {
      console.log(err)
    }
  }
  static categoryview = async (req, res) => {
    try {
      const result = await CategoryModel.findById(req.params.id);
      // console.log(result);
      res.render("admin/category/categoryview", { b: result });
    } catch (err) {
      console.log(err);
    }
  };
  static categoryedit = async (req, res) => {
    try {
      const result = await CategoryModel.findById(req.params.id);
      res.render("admin/category/categoryedit", { categoryedit: result });
    } catch (err) {
      console.log(err);
    }
  }
  static categoryupdate = async (req, res) => {
    try {
      // console.log(req.params.id);
      // console.log(req.body);

      //icon for image deletion
      const categorydata = await CategoryModel.findById(req.params.id)
      //
      const imageid = categorydata.image.public_id
      //
      await cloudinary.uploader.destroy(imageid)


      //image code upadate
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath,
        {
          folder: 'category_image',
        });


      const result = await CategoryModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        }

      });
      await result.save();
      res.redirect('/admin/category');
    } catch (err) {
      console.log(err);
    }
  }
  static categorydelete = async (req, res) => {
    try {
      //for image deletion
      const categorydata = await CategoryModel.findById(req.params.id)
      console.log(categorydata);

      const imageid = categorydata.image.public_id;
      await cloudinary.uploader.destroy(imageid);

      const result = await CategoryModel.findByIdAndDelete(req.params.id);
      res.redirect('/admin/category');
    }
    catch (err) {
      console.log(err);
    }
  };
}
module.exports = CategoryController;
