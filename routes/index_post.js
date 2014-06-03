var gm = require('googlemaps');
var yelp = require('./yelp.js');

var getLocation = function(lat, lon, callback) {
	var locationData = lat + "," + lon;
	gm.reverseGeocode(locationData, function(err, data){
		//if (err) console.log(err);
		//if (data) console.log(data);
		callback(err, data);
	});
	callback(null, "");
};


module.exports = function(req, res) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;

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

		    yelp.searchFood(latitude, longitude, function(err, data) {
			    if (data) {
				    res.render('home', {
				          error: err,
				          location: {
				              latitude: latitude,
				              longitude: longitude,
				              map: addressLoc
				          },
					    //restaurantData: JSON.parse(JSON.stringify(data, null, '\t').replace("\n", " ")),
						  bizData: data
				      });
			    }
		    })
	    }

    });

};