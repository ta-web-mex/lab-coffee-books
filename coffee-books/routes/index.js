const express = require('express');
const router  = express.Router();
const passport = require("../config/passport")

const {signup, signUpView, login, loginView, logout} = require("../controllers/authControllers")
const {createPlaceView,placesView}=require("../controllers/placesControllers")
const {isAuthenticated,checkRole}=require("../middlewares")
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/signup',signUpView);
router.post('/signup',signup)
router.get("/login", loginView)
router.post("/login",
            passport.authenticate("local",{
              successRedirect:"/create",
              failureRedirect:"/login",
              failureFlash:true
            }))

            //Aqui va facebook
router.get('/auth/facebook', passport.authenticate('facebook'));
 router.get('/auth/facebook/callback',
   passport.authenticate('facebook', { successRedirect: '/create',
  failureRedirect: '/login' }, ));




  router.get('/create',isAuthenticated,createPlaceView)

  router.get("/logout",logout)
  
  
  router.get("/feeds",placesView)

module.exports = router;
