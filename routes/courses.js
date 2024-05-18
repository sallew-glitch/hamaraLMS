var express = require("express");
var router = express.Router();
const Course = require("../models/courses");
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
});

module.exports = router;
