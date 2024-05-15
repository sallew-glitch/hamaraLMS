var express = require("express");
var router = express.Router();
//GET Routes
router.get("/", function (req, res, next) {
  res.send("Courses");
});

module.exports = router;
