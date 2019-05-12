const mongoose = require('mongoose');

mongoose.connect("mongodb://mds:Ajay7868@ds121461.mlab.com:21461/metadesign",{ useNewUrlParser: true },(err)=>{
    if(err) console.log(err)
    console.log("Database Connected")
})