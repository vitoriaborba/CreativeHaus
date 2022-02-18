const router = require("express").Router();
const User = require("../models/User.model");
const Client = require("../models/Client.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


router.get("/:id/client-page", isLoggedIn, (req, res, next) =>{
    const {id} = req.params;
    console.log(id)
    Client.findById(id)
    .then((dbclient)=>{
        res.render("client/client-page", {clientDetails: dbclient})
        
    })
})
module.exports = router;

