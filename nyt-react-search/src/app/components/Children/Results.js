// Include React 
var React = require('react');

// Create Components
var Results = React.createClass({
	clickToSave: function (i) {
		// get index (param [i]) of the results array
		// match with key={i} in .map
		// gives us which button we are wanting 
		var data = this.props.results[i];
		console.log(data)
		this.props.saveArticles(data.headline.main, data.pub_date, data.web_url);
	}, 
	// render function
	render: function(){
		// make "that = this" otherwise "this" is still referring to "Results"
		var that = this; 
		return(

			<div className="panel panel-warning">
				<div className="panel-heading">
					<h3 className="panel-title text-center"><strong>Results</strong></h3>
				</div>
				<div className="panel-body">
					{that.props.results.map(function(obj, i) {
						return (
							// .bind(that, i) to each clickToSave function 
							// therefore will know which button we want
							<div className="result-items" key={i}><a href={obj.web_url} target="_blank">{obj.headline.main}</a><br />{obj.pub_date}<br /><button type="button" className="btn btn-warning" style={{'float': 'right', 'marginTop': '-39px'}} onClick={that.clickToSave.bind(that, i)}>Save</button></div>
						)
					})}
				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Results;