const router = require("express").Router();
const User = require("../models/User.model");
const Client = require("../models/Client.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require('../config/cloudinary.config');

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

  router.post("/add-client", fileUploader.single('image'), (req, res, next) => {
      const id = req.session.user._id
      const {name, email} = req.body;
      let image;


       if (req.file) {
    image = req.file.path;
  }
      Client.create({name, email, imageUrl: image})
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

  router.get("/:id/edit-client", (req, res, next) => {
   const {id} = req.params
    Client.findById(id)
    .then((dbClient) => {
        res.render("user/edit-client", {dbClient});
    })
    .catch((err) => next(err))
  });
  
  router.post('/:id/edit-client', fileUploader.single('image'), (req, res, next) => {
    const {id} = req.params
    const { name, email} = req.body;
    let image;

    if (req.file) {
 image = req.file.path;
}
  
    Client.findByIdAndUpdate(id, { name, email, imageUrl: image })
      .then(() => {
        res.redirect(`/client/${id}/client-page`);
      })
      .catch((err) => {
        next(err);
      });
  });

  router.post('/:id/delete', isLoggedIn, (req, res, next) => {
    const {id} = req.params;
    User.findByIdAndDelete(id)
    .then(() => {
        res.redirect('/user/client-list');
})
    .catch((err) => next(err));
})



module.exports = router;