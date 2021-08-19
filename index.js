
const http = require('http');
const express = require('express');
const url = require('url');
const {Server} = require('socket.io');
const app = express();
const server = http.createServer(app);
const fs = require('fs');
const io= new  Server(server);


require('./db/connection');

const validator = require('validator');
const mongoose = require('mongoose');
const PlayList = require('./models/collections');
const { static } = require('express');
// mongoose.connect("mongodb://localhost:27017/fb_chat" ,{useNewUrlParser:true, useUnifiedTopology:true}).then(() =>{
//     console.log("cinnection succefully....");
// }).catch((err)=>{
//     console.log(err);
// });

// const playListSchema = new mongoose.Schema({
//     first_name:{
//         type:String,
//         // required:true,
//         // lowercase:true,
//         // trim : true,
//         // minlength : 2,
//         // maxlength: 30
//     },
//     Surname:{
//         type:String,
//         // required:tr
//     },
//     password:{
//         type:String
//     },
//     email : {
//         type: String
//         // unique : true,
//         // validate(value){
//         //     if(validator.isEmail(value))
//         //     throw new Error("email is invalid");
//         // }
//     },
//     dob : {
//         type :Date
//     },
//     gender : {
//         type : String
//     }
// })

// const PlayList = new mongoose.model("PlayList",playListSchema);
var self_id;
var friend_id;
const documentsw =async (name,surname,emails,pass,genders)=>{
    try{
        console.log(name+surname+emails+pass+genders);
        const reactPlayList = PlayList({
            first_name:name,
            Surname:surname,
            email:emails,
            password:pass,
            gender : genders
        })
        console.log("complete");
        const rr = await reactPlayList.save();
        // console.log(rr);
    }
    catch(err){
        console.log(err);
    }
}
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
const check_status=async (user,pass,socket)=>{
    try{
        const options = {
            hostname:'localhost',
            port:3000,
            path:'/user',
            method:'POST'
        }
        // console.log(user,pass);
        const result = await PlayList.find({$and : [ {first_name:user},{password:pass} ]});
        console.log(result.length);
        if(result.length!=0){
            console.log(result[0]["_id"]);
            self_id = result[0]["_id"];
            console.log("log in success fully");
            // const urls = "http://localhost:3000/user?"+user;
            // window.location.replace(urls);
            socket.emit('log_in');
            // http.request(options,res =>{
                
            //     console.log("succesfully...");
            // })

        }
        else{
            console.log("username or password is wrong...")
        }
        // console.log(result);
    }
    catch(err){
        console.log(err);
    }
}

//var chat_message = '/home/messanger/'+'60cb1a5325b17826905203d9';
const append_friend_id =async (id)=>{
    id=id
    chat_message = '/home/messanger/'+id;
}

// const find_friends = async ()=>{
//     try{
//         // const data = await PlayList.find();
//         // const data1 = JSON.stringify(data);
//         console.log('data successfully send...');
//         // const ww = fs.writeFile('public/find_friends1.json',data1,()=>{
//         //     console.log("data succesfully send...");
//         // })
//     //     console.log('dksj');
//     // const data = await PlayList.find();

//     //     if(data.length!=0){
//     //         // const data1=JSON.parse(data);
//     //         // data=JSON.parse()
//     //         console.log(data);
//     //         console.log(data[0].first_name);
//     //         socket.emit('start',data);
//     //     }
//     }
//     catch(err){
//         console.log(err);
//     }
// }


io.on('connection',(socket)=>{
    socket.on('save msj', (name,surname,emails,pass,genders) =>{
        documentsw(name,surname,emails,pass,genders);
    })
    socket.on('check',(user_names,pass_words)=>{
      //  console.log("sjkjsdkjsdkjskjskdjdjsjsjskdjskd");
        // res.send(__dirname+'/index1.html');
        check_status(user_names,pass_words,socket);
    })
    socket.on('chat message', (msg,a,b) => {
       // console.log(self_id+friend_id)
        io.emit('chat message', msg,a,b);
        
        // console.log('message: ' + msg);
      })
      socket.on('pass_friend_id',(id)=>{
          friend_id = id;
          append_friend_id(id);
         // console.log(self_id)
          socket.emit('pass_friend_id',self_id)
       
          console.log(chat_message);
          
      });
      socket.on('get_id',(id)=>{
          socket.emit('get_id',self_id);
      });
      socket.on('fix_self_id',(id)=>{
          self_id=id;
      })
    //   socket.on('find_friend',()=>{
    //     find_friends();
    //   })
    console.log('connection...');
})

// var socket = io();



// app.get('/user/',(req,res)=>{
//     res.sendFile(__dirname+'/home.html');
// })
app.get('/find_friends/',(req,res)=>{
    // console.log(req.url);
    res.sendFile(__dirname+'/find_friends.html');
    
    
})

app.get('/find_friend/',async(req,res)=>{
    try{
        const studentData = await PlayList.find();
        res.send(studentData);
    }
    catch(e){
        console.log(e);
    }
})
app.get('/home/',(req,res)=>{
    res.sendFile(__dirname+'/home.html');
})
app.get('/home/messanger/:id',(req,res)=>{
    res.sendFile(__dirname+'/index1.html');
  //  console.log(id);
})
app.get('/profile',(req,res)=>{
    res.sendFile(__dirname+'/profile.html')
})
app.get('/socket.io/socket.io.js',(req,res)=>{
    res.sendFile(__dirname+'/socket.io/socket.io.js');
})



server.listen(3000,()=>{
    console.log('listining.....');
})

