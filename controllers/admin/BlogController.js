const { findById } = require("../../models/Blog");
const blogModel = require("../../models/Blog");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "df0jht2dd",
  api_key: "299132352993518",
  api_secret: "p-ZFBgMJu9iAunrDnsJF5i9s2tY",
  // secure: true
});

class BlogController {
  static blogdisplay = async (req, res) => {
    try {
      const data = await blogModel.find();
      //   console.log(data);
      res.render("admin/blog/display", { d: data });
    } catch (err) {
      console.log(err);
    }
  };
  static bloginsert = async (req, res) => {
    //    console.log('req.body')
    // console.log('hello')
    // console.log(req.files.image);
    const file = req.files.image;
    const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "blogs_image",
    });
    // console.log(myimage)
    try {
      const result = new blogModel({
        title: req.body.title,
        description: req.body.description,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });
      await result.save();
      //route url in redirect
      res.redirect("/admin/blogdisplay");
    } catch (err) {
      console.log(err);
    }
  };
  static blogview = async (req, res) => {
    // console.log(req.params.id);
    try {
      const result = await blogModel.findById(req.params.id);
      // console.log(result);
      res.render("admin/blog/blogview", { b: result });
    } catch (err) {
      console.log(err);
    }
  };
  static blogedit = async (req, res) => {
    // console.log(req.params.id)
    try {
      const result = await blogModel.findById(req.params.id);
      // console.log(result);
      res.render("admin/blog/blogedit", { b: result });
    } catch (err) {
      console.log(err);
    }
  };
  static blogupdate = async (req, res) => {
    try {

       if(req.files){
        const blogdata = await blogModel.findById(req.params.id);
        // console.log(blogdata)
        const imageid = blogdata.image.public_id;
        // console.log(imageid);
        await cloudinary.uploader.destroy(imageid);
  
        //image update code
  
        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "blogs_image",
        });
        var imgdata = {  title: req.body.title,
          description: req.body.description,
          image: {                                                            
            public_id: myimage.public_id,
            url: myimage.secure_url,
          },}
          

       }else{
            var imgdata = {
              title: req.body.title,
              description: req.body.description,
            }
       }

      //   console.log(req.params.id);
      //   console.log(req.body);

      // icode for mage deletion
    

      const result = await blogModel.findByIdAndUpdate(req.params.id, imgdata);
      await result.save();
      res.redirect("/admin/blogdisplay");
    } catch (err) {
      console.log(err);
    }
  };
  static blogdelete = async (req, res) => {
    try {
      // for image deletion
      const blogdata = await blogModel.findById(req.params.id);
      // console.log(blogdata);
      const imageid = blogdata.image.public_id;
      await cloudinary.uploader.destroy(imageid);

      const result = await blogModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/blogdisplay");
    } catch (err) {
      console.log(err);
    }
  };
}
module.exports = BlogController;
