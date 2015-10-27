var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var commonHeader = {"Content-Type": "text/html"};
// handle the HTTP route GET / and POST / i.e. Home

function home(request, response) {
	// if the url = "/" && GET
	if(request.method.toLowerCase() === "get") {
		if (request.url === "/"){
			//show search
			response.writeHead(200, commonHeader);
			renderer.view("header", {}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		
		}
	} else {
		//if the url == "/" && POST

		//get the post data from body
		request.on("data", function(postBody){
			var query = querystring.parse(postBody.toString());
			response.writeHead(303, {"Location": "/" + query.username});
			response.end();
		});
		//extract the username

			//redirect the /:username

	}
}

// Handle HTTP route get GET /:username i.e. /massimocrapanzano
function user(request, response){
	//if the url == "/...."
	var username = request.url.replace("/", "");
	if(username.length > 0) {
		response.writeHead(200, commonHeader);
		renderer.view("header", {}, response);;

		//get json from treehouse
		var studentProfile = new Profile(username);
		//on "end" 
		studentProfile.on("end", function(profileJSON){
			//show the profile

			//Store the values which we need

			var values = {
				avatarUrl: profileJSON.gravatar_url,
				username : profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javaScriptPoints: profileJSON.points.JavaScript
			};
			//simple response 
			renderer.view("profile", values, response);
			renderer.view("footer", {}, response);
			response.end();

		});
			//on "error"
		studentProfile.on("error", function(error){
 			//show the error
 			renderer.view("error", {errorMessage: error.message}, response);
 			renderer.view("search", {}, response);
 			renderer.view("footer", {}, response);
 			response.end();
		});
		
	}
}

module.exports.home = home;
module.exports.user = user;





