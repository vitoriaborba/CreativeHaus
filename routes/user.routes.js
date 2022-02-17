const router = require("express").Router();
const User = require("../models/User.model");
const Client = require("../models/Client.model");


router.get("/client-list", (req, res, next) => {
    res.render("user/client-list");
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
      const {name, email, user} = req.body;
      Client.create({name, email, user})
      .then((dbClient) => {
          return User.findByIdAndUpdate(user, {$push: {clients: dbClient._id}});
      })
      .then((dbClient)=> {
          console.log('client created',{clients: dbClient} )
          res.redirect('/user/client-list')
      })
      .catch((err) => next((err)))
  });



module.exports = router;