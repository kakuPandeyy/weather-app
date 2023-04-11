const express = require("express")
const bodyParser = require("body-parser")
const https = require("https");
require("dotenv").config()
var app = express()
app.use(bodyParser.urlencoded({extended:true}));
 


app.get("/" , function(req,res){
    res.sendFile(__dirname + "/weather.html")

 

})

app.post("/", function(requ,resp){
    var x = requ.body.state
    const url = process.env.API_URL + x
    https.get(url,function(responce){
        responce.on("data",function(data){
    var weatherData = JSON.parse(data)
    var tem = weatherData.main.temp
    var des =  weatherData.weather[0].description
    var iconCODE = weatherData.weather[0].icon
    const iconURL = "https://openweathermap.org/img/wn/"+ iconCODE +"@2x.png"

  resp.write("<h1>temperature in " + x + "  is " +tem + " degree celcius</h1> <br>")
  resp.write("<h1>weather in  " + x + "   " +des + "</h1>")
  resp.write("<img src=" +iconURL+ ">" )
  resp.send()
        }
      )
    
    })
})

app.listen(3000,()=>{
 console.log("connect on")
})