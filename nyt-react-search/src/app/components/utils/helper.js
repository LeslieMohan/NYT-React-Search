//axios package for performing HTTP requests
var axios = require('axios');

// New York Times API
var APIKey = "097be422255e45a18b6864a8176f4a6c";

// Helper Functions
var helpers = {

	runQuery: function(term, start, end){
		var term = term.trim();
		// API format YYYYMMDD --> allow just year but preset MMDD to 01/01
		var start = start.trim() + "0101";
		// API format YYYYMMDD --> allow just year YYYY but preset MMDD to 12/31 
		var end = end.trim() + "1231";

		console.log("Query Run");

		// checkout: https://www.npmjs.com/package/axios
		return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
			params: {
				'api-key': APIKey,
				'q': term,
				'begin_date': start,
				'end_date': end
			}
		})
		.then(function(results){
				console.log("results from runQuery")
				console.log(results)

				var newResults = [];
				//axios returns a obj as results and "data" is a key on the obj
				var fullResults = results.data.response.docs;
				var counter = 0;

				//Find 5 articles that have all 3 components
				for(var i = 0; i < fullResults.length; i++){

					if(counter > 4) {
						return newResults;
					}

					if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
						newResults.push(fullResults[counter]);
						counter++;
					}
				}

				return newResults;
		})
	},

	//function to post saved articles to database.
	postArticle: function(title, date, url) {

		axios.post('/api/saved', {title: title, date: date, url: url})
		.then(function(results){

			console.log("Posted to MongoDB");
			return(results);
		})
	},

}


// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;