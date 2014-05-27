var moment = require('moment');

var yelp = require("yelp").createClient({
  consumer_key: "oFk754uhxvAlT-r8ttVyAg",
  consumer_secret: "RE6MA485GTtu4rP1aV_px1FUFhw",
  token: "ofoUa9fuzM7VEjvG62T39hk_RcIEgDJX",
  token_secret: "4D7XE50RLdZRmGixvAnI2MWFJjk"
});



var momentDate = moment();

var foodData = {};
foodData["date"] = momentDate;


//res.writeHead(200, {
//		'Content-Type': 'application/json' });

//res.write(JSON.stringify(foodData));
//res.end();

var count = 0;

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({term: "food", location: "Montreal"}, function(err, data) {
	if (err) console.log(err);
	var montrealdata = JSON.parse(JSON.stringify(data).replace("\n", " "))
	//res.write(JSON.stringify(montrealdata));
	count++;

//	if (count == 2) {
//		res.end();
//	}
});

// See http://www.yelp.com/developers/documentation/v2/business
yelp.business("yelp-san-francisco", function(err, data) {
	if (err) console.log(err);
	//foodData["sf"] = JSON.parse(JSON.stringify(data).replace("\n", "space"))

	var sfdata = JSON.parse(JSON.stringify(data).replace("\n", " "));
	//res.write(JSON.stringify(sfdata));
	count++;
//	if (count == 2) {
//		res.end();
//	}
});
