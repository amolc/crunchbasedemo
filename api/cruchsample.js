var express = require('express');
var mysql = require('mysql');
var crunchbase = require('crunchbase2');
//var request = require('request');

var apikey='43e29d431e62c74c0cbcc52a041cb875';


crunchbase.init(apikey);


exports.getsamplecompany = function(req,res){
	
	console.log(req.body);
	
	crunchbase.search(req.body.compname, function(error, results) {
		if (!error) {
			console.log(results);
		}
		console.log("results:",results);
		console.log("error:",error);
		res.jsonp(results);
	});
  	  
}


/*request('https://api.crunchbase.com/v/3/organizations?name=github&user_key=43e29d431e62c74c0cbcc52a041cb875', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
})*/