const router = require("express").Router();
const axios = require('axios');
const async = require("hbs/lib/async");
const api = axios.create({
  baseURL: 'https://www.thecolorapi.com'
})
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;


router.get("/color-palette", (req, res, next) => {
res.render("color-palette");
})

router.post("/color-palette-select", async (req, res, next) => {
  const colorhex = req.body.colorhex.split('#')[1]
  const paletteOption = req.body.paletteOption
  let colorScheme;
  if (!paletteOption) {
    return res
      .status(400)
      .render("color-palette", { errorMessage: "Please select a palette option." });
  }
  try {
    colorScheme = await axios.get(`https://www.thecolorapi.com/scheme?hex=${colorhex}&mode=${paletteOption}&count=5`)
    console.log(colorhex)
    console.log(colorScheme.colours)

    res.render("color-palette", {colorScheme: colorScheme.data})
  }
  catch(err) {
    next(err);
  }
})

