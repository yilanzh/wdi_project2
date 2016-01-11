_.templateSettings = {
  evaluate: /\{\[([\s\S]+?)\]\}/g,
  interpolate: /\{\{([\s\S]+?)\}\}/g
};

$(document).ready(function(){
	var partylistview = new app.PartiesListView();
	var router = new app.Router();
	// router.on("route:index", function(){
		// console.log("load index page");
		partylistview.render();
	// });
	Backbone.history.start();
});