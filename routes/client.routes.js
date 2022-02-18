const router = require("express").Router();
const User = require("../models/User.model");
const Client = require("../models/Client.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const axios = require('axios');

const api = axios.create({
    baseURL: 'https://www.thecolorapi.com'
  })

router.get("/:id/client-page", isLoggedIn, (req, res, next) =>{
    const {id} = req.params;
    console.log(id)
    Client.findById(id)
    .then((dbclient)=>{
        res.render("client/client-page", {clientDetails: dbclient})
        
    })
})
module.exports = router;

// // Add New Color 

router.get("/:id/client-color", isLoggedIn, (req, res, next) => {

    res.render("client/client-color")

})



router.post("/:id/new-color", (req, res, next) => {

    const {id} = req.params;
    const {color} = req.body;
    
    Client.findByIdAndUpdate(id, {$push: {colorPalette: color}})
    .then((updatedClient)=> {

        console.log(updatedClient)
    
        res.redirect(`/client/${id}/client-page`)
    })
    .catch((err) => next((err)))
});

