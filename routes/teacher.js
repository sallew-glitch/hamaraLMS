const express = require("express");
const router = express.Router();
const Course= require("../models/courses");

//GET Routes
router.get("/", function (req, res, next) {
  res.send("Teacher Dashboard");
});

router.put("/addmarks/:sid/:cid",function(req,res,next){
  const { marks } = req.body; // Assuming marks are passed in the request body

  Courses.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.cid), 'students.sid': mongoose.Types.ObjectId(req.params.sid) },
    {
      $set: {
        'students.$.marks': marks
      }
    },
    { new: true, upsert: false }
  ).then(
    (result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Course or student not found' });
      }
    },
    (err) => {
      res.status(500).json({ error: err.message });
    }
  );

})
module.exports = router;
