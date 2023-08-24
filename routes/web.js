const express = require("express");
const AdminController = require("../controllers/admin/AdminController");
const BlogController = require("../controllers/admin/BlogController");

const FrontendController = require("../controllers/FrontendController");

const { dashboard }  = require('../controllers/admin/AdminController');
const CategoryController = require("../controllers/admin/CategoryController");
const AboutController = require("../controllers/admin/AboutController");
const ContactController = require("../controllers/admin/ContactController");
const { categoryview } = require("../controllers/admin/CategoryController");
const FrontController = require("../controllers/FrontendController");
const admin_auth = require('../middleware/auth')
const router = express.Router();


// router.get("/",(req,res) => {
//     res.send("Hello World!")
// });



//==================frontend controller==========================
router.get('/',FrontendController.home)
router.get('/about',FrontendController.about)
router.get('/contact',FrontendController.contact)
router.get('/login',FrontendController.login)
router.get('/blog',FrontendController.blog)
router.get('/blogdetail/:id',FrontendController.blogdetail)
router.get('/register',FrontController.adminregister)
router.post('/adminregister',FrontController.admininsert)
router.post('/verify_login',FrontController.verifylogin)
router.get('/logout',FrontController.logout)
router.get('/reg',FrontendController.registerform)
//==================admin controller=====================
router.get('/admin/dashboard',admin_auth,AdminController.dashboard)
router.post('/forminsert',admin_auth,AdminController.forminsert)
router.get('/admin/registration',admin_auth,AdminController.registrationview)
// router.get('/admin/registration',AdminController.forms )

//==================blog controller========================
router.get('/admin/blogdisplay',admin_auth,BlogController.blogdisplay)
router.post('/bloginsert',admin_auth,BlogController.bloginsert)
router.get('/admin/blogview/:id',admin_auth,BlogController.blogview)
router.get('/admin/blogedit/:id',admin_auth,BlogController.blogedit)
router.post('/blogupdate/:id',admin_auth,BlogController.blogupdate)
router.get('/admin/blogdelete/:id',admin_auth,BlogController.blogdelete)

//====================category caontroller====================
router.get('/admin/category',admin_auth,CategoryController.category )
router.post('/categoryinsert',admin_auth,CategoryController.categoryinsert)
router.get('/admin/categoryview/:id',admin_auth,CategoryController.categoryview)
router.get('/admin/categoryedit/:id',admin_auth,CategoryController.categoryedit)
router.post('/categoryupdate/:id',admin_auth,CategoryController.categoryupdate)
router.get('/admin/categorydelete/:id',admin_auth,CategoryController.categorydelete)
//=========================about controller=====================
router.get('/admin/about',admin_auth,AboutController.about)
router.get('/admin/aboutedit',admin_auth,AboutController.aboutedit)
router.post('/aboutupdate',admin_auth,AboutController.aboutupdate)
//=========================contact controller=======================
router.get('/admin/contact',admin_auth,ContactController.contactview)
router.post('/contactinsert',admin_auth,ContactController.contactinsert)
module.exports = router
