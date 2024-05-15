var express=require("express");
var router= express.Router();
//GET Routes
router.get('/',function(req,res,next){
    res.send("Head Dashboard");
});



module.exports=router;