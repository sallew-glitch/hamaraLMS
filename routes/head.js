const express = require("express");
const router = express.Router();
//GET Routes
router.get("/", function (req, res, next) {
  res.send("Head Dashboard");
});

module.exports = router;
