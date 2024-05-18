const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Class = require("../models/class");
const Course = require("../models/courses");
const { withdrawCourse, enrollCourse } = require("../Controllers/student");

// GET Routes
router.get("/", function (req, res, next) {
  res.send("Student Dashboard");
});

// Route to get teachers for a student
router.get("/teachers/:sid", async (req, res) => {
  try {
    const { sid } = req.params;

    const student = await Student.findById(sid).populate("classes.teacher");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const classIds = student.classes.map((c) => c.cid);

    const classes = await Class.find({ _id: { $in: classIds } }).populate(
      "teachers.tid"
    );

    let teachers = [];
    classes.forEach((c) => {
      c.teachers.forEach((t) => {
        teachers.push(t.tid);
      });
    });

    teachers = teachers.filter(
      (teacher, index, self) =>
        index === self.findIndex((t) => t._id.equals(teacher._id))
    );

    res.json({ teachers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get grades for a student
router.get("/grades/:sid", async (req, res) => {
  const { sid } = req.params;

  try {
    const courses = await Course.find(
      { "students.sid": sid },
      "name students.$"
    );

    const grades = courses.map((course) => {
      const studentData = course.students.find(
        (student) => student.sid.toString() === sid
      );
      return {
        courseName: course.name,
        marks: studentData.marks,
      };
    });

    res.json({ grades });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to withdraw from a course
router.delete("/withdrawcourse/:cid", async (req, res) => {
  withdrawCourse(req, res);
});

// Route to enroll in a course
router.post("/enrollcourse/:cid", async (req, res) => {
  enrollCourse(req, res);
});

module.exports = router;
