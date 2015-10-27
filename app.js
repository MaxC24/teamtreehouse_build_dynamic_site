var router = require("./router.js");
//Problem: We need a simple way to look at a user's badge count and Javascript points from a web browser.
//Solution: use node js t perform the profile look ups and server our template via HTTP

//1. create a web server 

var http = require("http");
http.createServer(function (request, response){
	router.home(request, response);
	router.user(request, response);
}).listen(3000);
console.log("Server running at http://<workspace-url>/");


