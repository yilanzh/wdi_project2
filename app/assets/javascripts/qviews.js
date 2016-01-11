//test.js
// candidate tipping

var app = app || {};

app.QuatListView = Backbone.View.extend({
	el: '.bigdiv',

	render: function() {
		console.log("start render view2");
	
		var candislist = new app.CandidatesList();
		var that = this;
		candislist.fetch({
			success: function(partieslist){
				console.log("candislist fetch success");
				console.log("candislist: ", candislist.models);
				
				var partyname = "";
				var arrayid = "";
				var candiname = "";
				var primedata = 0;
				var presidata = 0;

				var demodataArray = [];  //demo chart
				var demonameArray = [];  //demo chart
				var repudataArray =[];   //repub chart
				var repunameArray = [];  //repub chart
				var presdataArray =[];	 //presi chart
				var presnameArray = [];  //presi chart
				var prespartyArray = []; //presi chart

				candislist.each(function(item){
					//get party name
					arrayid = app.pidArray.indexOf(item.get("party_id"));
					partyname = app.pnameArray[arrayid];
					//get model data
					candiname = item.get("name");
					primedata = (1/item.get("primaryodds")*100).toFixed(0);
					presidata = (1/item.get("presidencyodds")*100).toFixed(0)
					//presi arrays
					prespartyArray.push(partyname);
					presnameArray.push(candiname);
					presdataArray.push(presidata);
					//primary data
					if (partyname === "Democrats") {
						demonameArray.push(candiname);
						demodataArray.push(primedata);
					} else {
						repunameArray.push(candiname);
						repudataArray.push(primedata);
					};
				});
				
				////////////////////////////////////
				//create party list using d3.js   //
				////////////////////////////////////


				var drawd3chart = function(divToAddTo){
					//clear divs
					d3.select(".q1").html("");
					d3.select(".q2").html("");
					d3.select(".q3").html("");
					d3.select(".q4").html("");

					var width = 500; //shared var
					var height = 250; //shared var

					///////////////////////
					/// chart 1 demo primaries
					//////////////////////

					//heading		
					d3.select(divToAddTo).append("h2").text("Democratic Primaries");	
					console.log("demonamearray:  ",demonameArray);
					console.log("demodataarray: ", demodataArray);
					//chart
					
					// create axis shared element
					var demoAxis = d3.svg.axis()
								.ticks(2)
								.scale(demoWidthScale);

					//scale demo only
					var demoWidthScale = d3.scale.linear()
									.domain([0,110])
									.range([0, width]); //max width

					//color scale demo only
					var demoColor = d3.scale.linear()
								.domain([1,70])
								.range(["firebrick","navy"]) ;


					var demoCanvas = d3.select(divToAddTo)
							.append("svg")
							.attr("class", "demo-svg")
							.attr("width", width)
							.attr("height", height)
							.append("g")
							.attr("transform", "translate(25,40)");


					var demoBars = demoCanvas.selectAll("rect")
							.data(demodataArray)
							.enter()
								.append("rect")
								.attr("height", 50)
								.attr("fill", function(d) {return demoColor(d)})
								.attr("y", function(d,i) {return i * 80})
								.attr("x", 0)
								.attr("width",0)
								.transition()
									.attr("width", function(d){ return demoWidthScale(d)})
									.duration(1000)
									.delay(500);

					var demoLabels = demoCanvas.selectAll("text.name")
							.data(demonameArray)
							.enter()
							.append("text")
							.attr("class", "demo-name")
							.text(function(d) {return d})
							.attr("x", 5)
							.attr("y", function(d,i) {return i * 80+30;})
							.style("fill", "white")
							;

					var demolabelsVal = demoCanvas.selectAll("text.value")
							.data(demodataArray)
							.enter()
							.append("text")
							.attr("class", "demo-value")
							.text("")
							.attr("x", function(d) {
								if(d<40){
									return demoWidthScale(d)+150;
								} else {
									return demoWidthScale(d)+5;
								};
							})
							.attr("y", function(d,i) {return i * 80+30;})
							.transition()
							.text(function(d) {return d+"%"})
							.delay(1500)
							;
					demoCanvas.append("g")
						.attr("transform", "translate(0,140)")
						.attr("class", "axis")
						.call(demoAxis);

				}
				drawd3chart('.q1');

			}
			
		});
	}
});