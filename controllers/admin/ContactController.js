const ContactModel = require('../../models/contact');
class ContactController{
    static contact = async(req,res)=>{
        res.render('admin/contact/display')
    }
    static contactinsert = async(req,res)=>{
        try {
            const result = new ContactModel({
              name: req.body.name,
              email : req.body.email,
              phone : req.body.phone,
              description: req.body.description,
              
            });
            await result.save();
            //route url in redirect
            res.redirect("/contact");
          } catch (err) {
            console.log(err);
          }
        };
    static contactview = async(req,res)=>{
        try{
            const result = await ContactModel.find()
            res.render('admin/contact/display',{contact : result})
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports = ContactController