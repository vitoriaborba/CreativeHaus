const router = require("express").Router();

router.get("/client-list", (req, res, next) => {
    res.render("user/client-list");
  });

module.exports = router;