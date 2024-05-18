var express=require("express");
var router= express.Router();
const Student = require("../models/student");
const Class = require("../models/class");
const Student = require("../models/student");
const Course = require("../models/courses");
const { withdrawCourse, enrollCourse } = require("../Controllers/student");

//GET Routes
router.get("/", function (req, res, next) {
  res.send("Student Dashboard");
});


router.get("/teachers/:sid", async (req, res) => {
  try {
    // Get the student ID from the request parameters
    const { sid } = req.params;

    // Find the student by ID
    const student = await Student.findById(sid);
router.get("/student/teachers/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId).populate(
      "classes.teacher"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }


    // Extract the list of classes enrolled by the student
    const classIds = student.classes.map((c) => c.cid);

    // Find the classes and populate the teachers field
    const classes = await Class.find({ _id: { $in: classIds } }).populate(
      "teachers.tid"
    );

    // Extract the list of teachers from the classes
    let teachers = [];
    classes.forEach((c) => {
      c.teachers.forEach((t) => {
        teachers.push(t.tid);
      });
    });

    // Remove duplicate teachers (if any)
    teachers = teachers.filter((teacher, index, self) =>
      index === self.findIndex((t) => t._id.equals(teacher._id))
    );

    res.json({ teachers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get('/grades/:sid', async (req, res) => {
  const { sid } = req.params;

  try {
    const courses = await Course.find({ 'students.sid': sid }, 'name students.$');
    
    const grades = courses.map(course => {
      const studentData = course.students.find(student => student.sid.toString() === sid);
      return {
        courseName: course.name,
        marks: studentData.marks,
      };
    });

    res.json({ grades });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/student/teachers/:id', async (req, res) => {
    const studentId = req.params.id;
  
    try {
      
      const student = await Student.findById(studentId).populate('classes.teacher');
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const teacher = student.classes[0].teacher;
  
      if (!teacher) {
        return res.status(404).json({ message: 'No teacher found for enrolled classes' });
      }
  
      res.json({ teacher }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    const teacher = student.classes[0].teacher;

    if (!teacher) {
      return res
        .status(404)
        .json({ message: "No teacher found for enrolled classes" });
    }

router.get('/student/teachers/:id', async (req, res) => {
    const studentId = req.params.id;
  
    try {
      
      const student = await Student.findById(studentId).populate('classes.teacher');
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const teacher = student.classes[0].teacher;
  
      if (!teacher) {
        return res.status(404).json({ message: 'No teacher found for enrolled classes' });
      }
  
      res.json({ teacher }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// POST /withdrawcourse/:cid
router.delete("/withdrawcourse/:cid", async (req, res) => {
  withdrawCourse(req, res);
});

// POST /enrollcourse/:cid
router.post("/enrollcourse/:cid", async (req, res) => {
  enrollCourse(req, res);
});

module.exports = router;