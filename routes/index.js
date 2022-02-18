const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;


router.get("/color-palette", (req, res, next) => {

res.render("color-palette");


})