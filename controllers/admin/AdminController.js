const registerModel = require("../../models/register");

class AdminController{
     static dashboard = async(req,res)=>{
        try{
            const{name} = req.admin
            res.render('admin/dashboard',{n:name})
        }
        catch(err){
            console.log(err);
        }
     }
     

   
     static forminsert = async (req, res) => {
        try {
   
          const result = new registerModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            rollnumber: req.body.rollnumber,
            gender: req.body.gender,
            address: req.body.address,
            college: req.body.college,
            course: req.body.course,
            branch: req.body.branch,
            
    
          });
          await result.save();
          // console.log(result)
          //route url in redirect
          res.redirect("/reg");
        } catch (err) {
          console.log(err);
        }
      };
      static registrationview = async (req, res) => {
        try {
        
          const result = await registerModel.find();
          // console.log(result);
          res.render("admin/student/registeration",{f:result});
        } catch (err) {
          console.log(err);
        }
      };
  
}
module.exports = AdminController