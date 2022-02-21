const router = require("express").Router();
const axios = require('axios');


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;


router.get("/color-palette", (req, res, next) => {
res.render("color-palette");
})

router.post("/color-palette-select", (req, res, next) => {
  const colorhex = req.body;
  const colorScheme = axios.get(`https://www.thecolorapi.com/scheme?hex=${colorhex}&mode=triad&count=5`)
  .then(() =>{
    res.render("color-palette", {colorScheme})
  })
})

