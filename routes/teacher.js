const express = require("express");
const { getStudentsInSpecificClassTaughtByTeacher } = require("../Controllers/teacher");

const router = express.Router();
//GET Routes
router.get("/", function (req, res, next) {
  res.send("Teacher Dashboard");
});

//get all students in specific class taught by a teacher
router.get("/classes/:cid/students", getStudentsInSpecificClassTaughtByTeacher);

module.exports = router;
