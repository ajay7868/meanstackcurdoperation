var signupModel = require('../model/signupModel')
const jwt = require('jsonwebtoken');

var token = function (req, res, next) {
   let tokenHolder = req.headers['authorization'].split(' ');
   const token = tokenHolder[1];
   jwt.verify(token, 'secret',(err,authData)=>{
     if(err) res.sendStatus(403);
     if(authData !== 'undefined'){
        signupModel.find({'_id':authData.userdata._id},function(err,doc){
               if(err){
                   console.log(err);
                   res.status(404).send({message:err})
                   return;
               }
                   req.body.signuser = doc[0]._id;
                   next();
           return;
       })
   }
})
}
module.exports = token;