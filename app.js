var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/location",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
const nmea = require('node-nmea');
var location;
mongoose.set('useFindAndModify', false);
var locaschema = new mongoose.Schema({
	nmea: String,
	name: Number
});

var loca = mongoose.model("loca",locaschema);



app.get("/location/:id",function(req,res){
	//res.send("Hi there");
	console.log(req.params.id);
	var request = req.params.id;
	
	
	
  	/*var gprmc = new loca({
		nmea: request,
		name: 2
	});
	
	gprmc.save();*/
	loca.findOneAndUpdate({name:2},{nmea:request,name:2},function(){
		res.send("LOCATION UPDATED");
	});
	
	
			
});



app.get("/",function(req,res){
	
  loca.find({name:2},function(err,array){
	  var data = array;
	  console.log(array);
	  data = data[0].nmea;
	  data = data.toString();
	  
	  console.log(data);
	data = nmea.parse(data);
  location = data.loc.geojson.coordinates;
	var lati = location[1];
	var longi = location[0];
	lati = lati.toString();
	longi = longi.toString();
	lati = lati.slice(0,lati.length-10);
	longi = longi.slice(0,longi.length-10);
	
	console.log(lati);
	console.log(longi);
	
	

	res.render("home.ejs",{lati:lati,longi:longi});
	
  }) ;
	
});




app.listen(3000,process.env.IP,function(){
	console.log("SERVER STARTED!");
});