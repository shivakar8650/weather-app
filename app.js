const express = require("express");
const bodyParser =require("body-parser");
const https = require("https");

const app =express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

 

 
});



app.post("/",function(req,res){

    const query =req.body.cityname;
    console.log(query);
    const appid ="01d338fc2e2a99f1f4ccb04e7a27115d";
    const units ="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid=" + appid +"&units="+units;
            
    https.get(url,function(response){
     console.log(response.statusCode);
     response.on("data",function(data){
         const weatherdata =JSON.parse(data);
         const temp= weatherdata.main.temp;
         const weatherdiscription =weatherdata.weather[0].description;
         const icon = weatherdata.weather[0].icon;
         const imgurl =" http://openweathermap.org/img/wn/"+ icon +"@2x.png";
         res.write("<p>The Current weather is:"+weatherdiscription + " </p>");
         res.write("<h1> The temperature "+ query+" is:" + temp+"</h1>");
         res.write("<img src =" +imgurl +">");
         res.send();
     })
    })
     });






app.listen("3000",function(req,res){
    console.log("server is runnig on port 3000");
})