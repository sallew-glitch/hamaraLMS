const express = require("express");
const mongoose = require("mongoose");
const Course = require("../models/courses.js"); // Adjust the path as necessary
const Student = require("../models/student"); // Adjust the path as necessary
const { addCourse } = require("../Controllers/COurses.js");
const router = express.Router();

// GET Route for courses
router.get("/", function (req, res, next) {
  res.send("Courses");
});

// DELETE Route to unenroll a student from a course
router.delete('/courses/:cid/unenroll-student/:sid', async (req, res) => {
  try {
    const { cid, sid } = req.params;

    const course = await Course.findById(cid);
    if (!course) {
      return res.status(404).send('Course not found');
    }

    course.students.pull(sid);
    await course.save();

    res.status(200).send('Student unenrolled successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// PUT Route to update a course
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
});

router.post("/head/addcourse", async (req, res) => {
  addCourse(req, res);
});

module.exports = router;
