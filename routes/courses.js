var express = require("express");
var router = express.Router();
//GET Routes
router.get("/", function (req, res, next) {
  res.send("Courses");
});

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

module.exports = router;
