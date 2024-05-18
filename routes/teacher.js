var express=require("express");
var router= express.Router();
//GET Routes
router.get('/',function(req,res,next){
    res.send("Teacher Dashboard");
});

router.get('/classes/:cid/students', function (req, res, next){

})


module.exports=router;