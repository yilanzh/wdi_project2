//viewsp1.js
// party tipping

var app = app || {};

app.PartiesListView = Backbone.View.extend({
	el: '.page',

	events: {
		"click #candidate-submit": "showCandidates"
	},

	showCandidates: function() {
		console.log("click search candidates");
		var canview = new app.CanListView();
		canview.render();
	},

	render: function() {
		console.log("start render view1");
		app.plist = new app.PartiesList();
		console.log("partylist: ", app.plist);
		var that = this;
		app.plist.fetch({
			success: function(){
				console.log("plist fetch success");
				//clean up data
				// var dataArray = partieslist.pluck("odds");
				// var nameArray = partieslist.pluck("name");
				var dataArray = [];
				var nameArray = [];
				var oddsArray = [];
				var pidArray = [];
				app.plist.each(function(item){
					dataArray.push((1/item.get("odds")*100).toFixed(0));
					nameArray.push(item.get("name"));
					oddsArray.push(item.get("odds").toFixed(2));
					pidArray.push(item.get("id"));
				});
				console.log("dataArray:  ", dataArray);
				console.log("nameArray:  ", nameArray);
				console.log("pidArray:  ", pidArray);
				app.pidArray = pidArray;
				app.pnameArray = nameArray;

				////////////////////////////////////
				//create party list using backbone//
				////////////////////////////////////
				var content = "	<p >This application uses data from the Betfair "+
				"API to predict the likelihood of outcomes in the U.S Presidential " +
				"Election. Betfair is an internet betting exchange that provides an " +
				"in-depth analysis of various markets. Historically, betting odds are " +
				"an accurate source in predicting the outcome of an event.</p>";

				content = content + "<h2 class='firstheading'>Partys chance to win general election</h2><table class='party-table'>";
				for (var i=0; i<dataArray.length; i++){
					content = content + "<tr><td>" + nameArray[i] + 
						"</td><td> " + dataArray[i] + "%</td><td>" + 
						" Price: $" + oddsArray[i] +"</td></tr>";
				};
					
				content = content + "</table>";
				content = content + "<button id='candidate-submit'>Lookup Candidates</button>";
				that.$el.html(content);
				
				////////////////////////////////////
				//create party chart using d3.js  //
				////////////////////////////////////

				// d3.select('.chart').html(""); //clear tag
				var width = 500;
				var height = 250;
				var domain = [0, 80];

				//scale
				var widthScale = d3.scale.linear()
								.domain(domain)
								.range([0, width]); //max width

				//color scale
				var color = d3.scale.linear()
							.domain([d3.min(dataArray),d3.max(dataArray)])
							.range(["firebrick","yellow"]) ; //["firebrick","navy"]

				// create axis
				var axis = d3.svg.axis()
							.ticks(2)
							.scale(widthScale)
							// .orient("bottom")
							;
				// console.log("axis: ", axis);

				var canvas = d3.select('.chart')
						.append("svg")
						.attr("width", width)
						.attr("height", height)
						.append("g")
						.attr("transform", "translate(25,40)");

				var bars = canvas.selectAll("rect")
						.data(dataArray)
						.enter()
							.append("rect")
							.attr("height", 50)
							.attr("class", function(d,i) {return "party-rect"+i;})
							.attr("fill", function(d) {return color(d)})
							.attr("y", function(d,i) {return i * 80})
							.attr("x", 0)
							.attr("width",0)
							.transition()
								.attr("width", function(d){ return widthScale(d)})
								.duration(1000)
								.delay(500);

				var labels = canvas.selectAll("text.name")
						.data(nameArray)
						.enter()
						.append("text")
						.attr("class", "party-name")
						.text(function(d) {return d})
						.attr("x", 5)
						.attr("y", function(d,i) {return i * 80+30;})
						// .style("fill", "#fff")
						// .attr("text-anchor","middle")
						;

				var labelsVal = canvas.selectAll("text.value")
						.data(dataArray)
						.enter()
						.append("text")
						.attr("class", "party-value")
						.text("")
						.attr("x", function(d) {return widthScale(d)-50})
						.attr("y", function(d,i) {return i * 80+30;})
						// .style("fill", "dimgray")
						// .style("font-size", "16px")
						.transition()
						.text(function(d) {return d+"%"})
						.delay(1500)
						;
				canvas.append("g")
					.attr("transform", "translate(0,160)")
					.attr("class", "axis")
					.call(axis)

			//bar chart ver2 using div test
			//basic
			// var margin = {top: 0, bottom: 20, left: 0, right: 0},


			}
		});
	}
});