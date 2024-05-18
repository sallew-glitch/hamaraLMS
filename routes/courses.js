const express = require("express");
const mongoose = require("mongoose");
const Course = require("../models/courses.js"); // Adjust the path as necessary
const Student = require("../models/student"); // Adjust the path as necessary
const { addCourse } = require("../Controllers/COurses.js");
const router = express.Router();
//GET Routes
router.get("/", function (req, res, next) {
  res.send("Courses");
});

// POST /head/addcourse
router.post("/head/addcourse", async (req, res) => {
  addCourse(req, res);
});

module.exports = router;
