
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


router.put("/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const updates = req.body; 

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updates, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
// POST /head/addcourse
router.post("/head/addcourse", async (req, res) => {
  addCourse(req, res);
});

module.exports = router;
