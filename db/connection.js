const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mohit_05:9483726161@crazyking.z3zkr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ,{useNewUrlParser:true, useUnifiedTopology:true}).then(() =>{
    console.log("cinnection succefully....");
}).catch((err)=>{
    console.log(err);
});