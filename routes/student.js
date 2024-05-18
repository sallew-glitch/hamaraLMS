var express=require("express");
var router= express.Router();
//GET Routes
router.get('/',function(req,res,next){
    res.send("Student Dashboard");
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
    }
  });


module.exports=router;
