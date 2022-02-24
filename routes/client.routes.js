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
    .then( async (dbclient)=>{
        console.log(dbclient)
        let fontData = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_KEY}`);
        // console.log(fontData.data.items)
        res.render("client/client-page", {clientDetails: dbclient, fontInfo: fontData.data.items, jsonData: encodeURIComponent(JSON.stringify(fontData.data.items))})
        
    })
})

// Create Client Font Page

router.get("/:id/client-fonts", isLoggedIn, (req, res, next) => {
    const {id} = req.params;
    console.log(id)
    Client.findById(id)
    .then( async (dbClient) => {

        console.log(dbClient)

        let fontData = dbClient.fontSuite.map((font) => {

            let newFont = font.family.split(' ').join('+')

            return {...font, newFont}

        })

        console.log(fontData)
        dbClient.fontSuite = fontData;
    

    res.render('client/client-fonts', {dbClient, layout:false, id})

    })

})

// // Add New Color 

router.get("/:id/client-color", isLoggedIn, async (req, res, next) => {
    const clientId = req.params.id;

    try {
    const {id} = req.params;
 
    let clientColor = {
        id: clientId,
        colorInfo: [],
    }

    const foundClient = await Client.findById(id);


    Promise.all(foundClient.colorPalette.map(async(color) => {

      let colorData = await axios.get(`https://www.thecolorapi.com/id?hex=${color}`)
        clientColor.colorInfo.push(colorData.data)
        return clientColor;
    }))

    .then(() =>{
      res.render("client/client-color", {clientColor, clientId})  

  })
}

catch(err) {

console.log(err)

}

})


router.post("/:id/new-color", isLoggedIn, (req, res, next) => {

    const {id} = req.params;
    const {color} = req.body;
    
    Client.findByIdAndUpdate(id, {$push: {colorPalette: color}})
    .then((updatedClient)=> {

        console.log(updatedClient)
    
        res.redirect(`/client/${id}/client-page`)

    })

    .catch((err) => next((err)))
});

// Delete a color

    

    router.post('/:id/delete', isLoggedIn, (req, res, next) => {
        const {id} = req.params;
        Client.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/user/client-list');
    })
        .catch((err) => next(err));
    })

// Delete a color
    
    router.post('/:id/:colorhex/delete', isLoggedIn, (req, res, next) => {
        const id = req.params.id
        const colorhex = req.params.colorhex
        console.log("ID:",id)
        console.log("ColorHex:",colorhex)

        Client.findByIdAndUpdate(id, {$pull: {colorPalette: colorhex}})
        .then(()=>{
                res.redirect(`/client/${id}/client-color`);
        }) 
        .catch((err) => next(err));
    })



 // Add New FONT

    router.post("/:id/new-font", isLoggedIn, async (req, res, next) => {
        const clientId = req.params.id;
        const {fontVar, fontName, fontOption, fontStyles} = req.body
        let newFont = {family: fontName, option: fontOption, variant: fontVar, styles: fontStyles}

        console.log(req.body)
        
        Client.findByIdAndUpdate(clientId, {$push: {fontSuite: newFont}}, {new: true})
        .then((updatedFonts) => {
            
            console.log(updatedFonts)

            res.redirect(`/client/${clientId}/client-page`)

        })
        .catch(err => next(err))

    })
       


    module.exports = router;
