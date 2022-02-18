const router = require("express").Router();
const User = require("../models/User.model");
const Client = require("../models/Client.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/client-list", (req, res, next) => {
    
    User.findById(req.session.user._id)
    .populate('clients')
    .then((user) => {
        console.log(user.clients)
        res.render("user/client-list", {clients: user.clients});
    })
    .catch((err) => next(err))
  });

// Add new client
router.get("/add-client", (req, res, next) => {
    User.find()
    .then((dbUsers) => {
        res.render("user/add-client", {dbUsers});
    })
    .catch((err) => next(err))
  });

  router.post("/add-client", (req, res, next) => {
      const id = req.session.user._id
      const {name, email} = req.body;
      Client.create({name, email})
      .then((dbClient) => {
          return User.findByIdAndUpdate(id, {$push: {clients: dbClient._id}});
      })
      .then((dbClient)=> {
          console.log('client created',{clients: dbClient} )
          res.redirect('/user/client-list')
      })
      .catch((err) => next((err)))
  });

  router.get("/user-home", isLoggedIn, (req, res, next) =>{
    const user = req.session.user;

      res.render("user/user-home", {user});
  })




module.exports = router;