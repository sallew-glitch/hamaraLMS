const mongoose =require("mongoose");
const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  teachers: {
    type: [
      {
        tid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
        },
      },
    ],
  },
  students: {
    type: [
      {
        sid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
      },
    ],
  },
});
module.exports=mongoose.model('Class',classSchema);
Class = require('./class');
const classes = [
  { name: 'Biology 101', department: 'Science' },
  { name: 'Calculus 202', department: 'Math' },
  // ... (3 more class objects)
];

const insertClasses = async () => {
  for (const c of classes) {
    const newClass = new Class(c);
    await newClass.save();
  }
};