const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fb_chat" ,{useNewUrlParser:true, useUnifiedTopology:true}).then(() =>{
    console.log("cinnection succefully....");
}).catch((err)=>{
    console.log(err);
});