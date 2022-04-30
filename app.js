// jshint esversion:6
const express = require('express');
const request = require('request');
const app=express();
app.use(express.static("public"));
const bodyparser = require('body-parser');
const https = require('https');
let date_ob = new Date();
app.use(bodyparser.urlencoded({extended:true}));
app.listen(process.env.PORT || 3000,function(){
  console.log("server is up on port 3000");
});
app.get("/",function(req,res){

  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const Fname =req.body.firstname;
  const Sname=req.body.secondname;
  const emailA =req.body.email;
// console.log(Fname);
// console.log(Sname);
// console.log(emailA);
// res.sendFile(__dirname+"/success.html");
const data={
  members:[{
    email_address:emailA,
  status:"subscribed",
  merge_fields:{
    FNAME:Fname,
    LNAME:Sname
  }
}]
};
const  jsondata=JSON.stringify(data);
const url =" https://us14.api.mailchimp.com/3.0/lists/07d9807218 ";
const options={
  method:"Post",
  auth: "ahmad:2620ab80b24d60a1eba59dc10261c6ef-us14"
};
var request= https.request(url,options,function(response){
  response.on("data",function(data){
    // console.log(JSON.parse(data));
if (response.statusCode===200){
  res.sendFile(__dirname+"/success.html");

}else{
    res.sendFile(__dirname+"/failure.html");

}

  });

});

request.write(jsondata);
request.end();

});
app.post("/failure",function(req,res)
{
  res.redirect("/");
});
// api mailchimp
// 2620ab80b24d60a1eba59dc10261c6ef-us14
// list id=  07d9807218
