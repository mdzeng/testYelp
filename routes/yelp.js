var searchFood = function(lat, lon, callback) {
	var yelp = require("yelp").createClient({
	  consumer_key: "oFk754uhxvAlT-r8ttVyAg",
	  consumer_secret: "RE6MA485GTtu4rP1aV_px1FUFhw",
	  token: "ofoUa9fuzM7VEjvG62T39hk_RcIEgDJX",
	  token_secret: "4D7XE50RLdZRmGixvAnI2MWFJjk"
	});

	var latlon = lat + "," + lon;
	//Modeled after http://api.yelp.com/v2/search?term=food&ll=37.788022,-122.399797
	yelp.search({term: "food", ll: latlon}, function(err, data) {
		if (err) console.log(err);

		var businesses = null;
		businesses = JSON.parse(JSON.stringify(data["businesses"]).replace("\n", " "));
		//console.log(businesses)

		var businessObjects = [];
		for (var bizItr in businesses) {
			var biz = businesses[bizItr];
			var businessSingle = {};

			for (var bizdata in biz) {
				businessSingle[bizdata] = biz[bizdata];
			}
			if (!businessSingle["is_closed"]) {
				businessObjects.push(businessSingle);
			}

		}
		callback(err, businessObjects)
	});
	//callback (null, "");
};

exports.searchFood = searchFood;