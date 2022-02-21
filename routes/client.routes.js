// Imports

const router = require("express").Router();
const User = require("../models/User.model");
const Client = require("../models/Client.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// API Info

const axios = require('axios');

const api = axios.create({
    baseURL: 'https://www.thecolorapi.com'
  })

  // Create Client Page

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

router.get("/:id/client-color", isLoggedIn, async (req, res, next) => {

    try {
    const {id} = req.params;
    let colorInfo = [];

    const foundClient = await Client.findById(id);

    console.log(foundClient)

    Promise.all(foundClient.colorPalette.map(async(color) => {

      let colorData = await axios.get(`https://www.thecolorapi.com/id?hex=${color}`)
        colorInfo.push(colorData.data)
        return colorInfo;
    }))

        .then(() =>{
          console.log("FINAL INFO", colorInfo)
        res.render("client/client-color", {colorInfo, foundClient})  
        })
}

catch(err) {

console.log(err)

}

})

    // res.render("client/client-color", {client: foundClient, colorInfo: apiData.data})

router.post("/:id/new-color", isLoggedIn, (req, res, next) => {

    const {id} = req.params;
    const {color} = req.body;
    
    Client.findByIdAndUpdate(id, {$push: {colorPalette: color}})
    .then((updatedClient)=> {

        console.log(updatedClient)
    
        res.redirect(`/client/${id}/client-color`)

    })

    .catch((err) => next((err)))
});

    

    router.post('/:id/delete', isLoggedIn, (req, res, next) => {
        const {id} = req.params;
        Client.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/user/client-list');
    })
        .catch((err) => next(err));
    })
    
    router.post('/:id/:colorhex/delete', isLoggedIn, (req, res, next) => {
        const id = req.params.id
        const {colorhex} = req.params.colorhex
        Client.findById(id)
        .then(()=>{
            findOneAndDelete(colorhex)
            .then(() => {
                res.redirect(`/client/${id}/client-color`);
        })
    })
        .catch((err) => next(err));
    })
    


