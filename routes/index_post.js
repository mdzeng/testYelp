var gm = require('googlemaps');


var yelp = require("yelp").createClient({
  consumer_key: "oFk754uhxvAlT-r8ttVyAg",
  consumer_secret: "RE6MA485GTtu4rP1aV_px1FUFhw",
  token: "ofoUa9fuzM7VEjvG62T39hk_RcIEgDJX",
  token_secret: "4D7XE50RLdZRmGixvAnI2MWFJjk"
});


var getLocation = function(lat, lon, callback) {
	var locationData = lat + "," + lon;
	gm.reverseGeocode(locationData, function(err, data){
		//if (err) console.log(err);
		//if (data) console.log(data);
		callback(err, data);
	});
	callback(null, "");
};


var searchFood = function(lat, lon, callback) {
	var latlon = lat + "," + lon;
	//Modeled after http://api.yelp.com/v2/search?term=food&ll=37.788022,-122.399797
	yelp.search({term: "food", ll: latlon}, function(err, data) {
		if (err) console.log(err);
		callback(err, data)
	});
	//callback (null, "");
}

module.exports = function(req, res) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;

	//var done = this.async();

    getLocation(latitude, longitude, function(err, data) {
        // diagnostic
        //console.log(latitude, longitude, err, data);
	    console.log("this is the data we want " + JSON.stringify(data["results"]));
	    var dataResults = data["results"];
	    //Lets just construct the first address

	    //IDEA: If this location is incorrect, please pick the closest location

	    var addressLoc = null;
	    if (dataResults) {
		    var address = dataResults[0];
		    addressLoc = address["formatted_address"];
	    }


	    if (addressLoc) {
		    searchFood(latitude, longitude, function(err, data) {
		   		if (err ) console.log(err);

			    var businesses = null
			    businesses = JSON.stringify(data["businesses"]).replace("\n", " ");
			    console.log(businesses)


			    if (businesses) {
				    res.render('home', {
				          error: err,
				          location: {
				              latitude: latitude,
				              longitude: longitude,
				              map: addressLoc
				          },
					      restaurantData: JSON.parse(JSON.stringify(data).replace("\n", " "))
				      });
		        }
		   	})

	    }

    });

};