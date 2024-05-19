var express=require("express");
var router= express.Router();
//GET Routes
router.get('/',function(req,res,next){
    res.send("Head Dashboard");
});
router.put('/head/assigncourse/:cid/:tid', async (req, res) => {
    try {
      const { cid, tid } = req.params;
  
      const course = await Course.findById(cid);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      if (course.department !== req.teacher.department) { 
        return res.status(400).json({ message: 'Teacher does not belong to the same department' });
      }
  

      const teacher = await Teacher.findById(tid);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      const existingTeachers = course.teachers.map(t => t.tid.toString());
      if (!existingTeachers.includes(tid)) {
        course.teachers.push({ tid });
        await course.save();
        return res.status(200).json({ message: 'Teacher assigned successfully' });
      } else {
        return res.status(409).json({ message: 'Teacher already assigned to the course' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports=router;