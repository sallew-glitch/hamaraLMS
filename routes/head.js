const express = require("express");
const router = express.Router();
const Teacher = require("../models/teacher");

//GET Routes
router.get("/", function (req, res, next) {
  res.send("Head Dashboard");
});

// UPDATE routes, remove teacher from deparment
router.put("/removeteacher/:tid", async (req, res, next) => {
  try{
    const {tid} = req.params;
    const teacher = await Teacher.findByIdAndUpdate(tid, {department: "null"});

    if(!teacher){
      return res.status(404).json({message: "Teacher not found"});
    }

    res.status(200).json({message: "Teacher removed from department successfully"});

  }
  catch{
    res.status(500).json({message: error.message});
  }
})

module.exports = router;
