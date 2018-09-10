var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "Title Required"
  },
  date: {
  	type: Date,
  	default: Date.now,
  	required: "Date Required"
  },
  url: {
  	type: String,
  	required: true,
  	required: "URL Required",
  	unique: true
  }
});

// Create the Model
var Article = mongoose.model('Article', ArticleSchema);

// Export it for use elsewhere
module.exports = Article;