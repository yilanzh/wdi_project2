//viewsp2.js
// candidate tipping




var app = app || {};

app.CanListView = Backbone.View.extend({
	el: '.page',

	events: {
		// "click #candidate-submit",
		"click .dem0": "dem0click",
		"click .dem1": "dem1click",
		"click .pres0": "pres0click",
		"click .pres1": "pres1click",
		"click .pres2": "pres2click",
		"click .pres3": "pres3click",
		"click .pres4": "pres4click",
		"click .pres5": "pres5click",
		"click .pres6": "pres6click",
		"click .pres7": "pres7click",
		"click .rep0": "rep0click",
		"click .rep1": "rep1click",
		"click .rep2": "rep2click",
		"click .rep3": "rep3click",
		"click .rep4": "rep4click",
		"click .rep5": "rep5click",
	},

	dem0click: function(){
		 $(".bio").hide();
		 $(".clinton").show();
		// alert("hhh!");
	},
	dem1click: function(){
		$(".bio").hide();
		$(".sanders").show();
		// alert("dem2");
	},
	pres7click: function(){
		$(".bio").hide();
		$(".sanders").show();
		// alert("dem2");
	},
	pres0click: function(){
		$(".bio").hide();
		$(".clinton").show();
		// alert("dem2");
	},
	pres1click: function(){
		$(".bio").hide();
		$(".rubio").show();
		// alert("dem2");
	},
	pres2click: function(){
		$(".bio").hide();
		$(".trump").show();
		// alert("dem2");
	},
	pres3click: function(){
		$(".bio").hide();
		$(".cruz").show();
		// alert("dem2");
	},
	pres4click: function(){
		$(".bio").hide();
		$(".bush").show();
		// alert("dem2");
	},
	pres5click: function(){
		$(".bio").hide();
		$(".sanders").show();
		// alert("dem2");
	},
	pres6click: function(){
		$(".bio").hide();
		$(".christie").show();
		// alert("dem2");
	},
	pres7click: function(){
		$(".bio").hide();
		$(".carson").show();
		// alert("dem2");
	},
	rep0click: function(){
		$(".bio").hide();
		$(".rubio").show();
		// alert("dem2");
	},
	rep1click: function(){
		$(".bio").hide();
		$(".trump").show();
		// alert("dem2");
	},
	rep2click: function(){
		$(".bio").hide();
		$(".cruz").show();
		// alert("dem2");
	},
	rep3click: function(){
		$(".bio").hide();
		$(".bush").show();
		// alert("dem2");
	},
	rep4click: function(){
		$(".bio").hide();
		$(".christie").show();
		// alert("dem2");
	},
	rep5click: function(){
		$(".bio").hide();
		$(".carson").show();
		// alert("dem2");
	},



	// start render ===============================================================
	// ============================================================================

	render: function() {
		console.log("start render view2");
	
		var biostring = $('#biocontent').html()
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

				var unrepudataArray =[];   //repub chart
				var unrepunameArray = [];  //repub chart
				var unpresdataArray =[];	 //presi chart
				var unpresnameArray = [];  //presi chart
				var unprespartyArray = []; //presi chart

				candislist.each(function(item){
					//get party name
					arrayid = app.pidArray.indexOf(item.get("party_id"));
					partyname = app.pnameArray[arrayid];
					//get model data
					candiname = item.get("name");
					primedata = 1/item.get("primaryodds")*100;
					presidata = 1/item.get("presidencyodds")*100;
					//presi arrays
					unprespartyArray.push(partyname);
					unpresnameArray.push(candiname);
					unpresdataArray.push(presidata);
					//primary data
					if (partyname === "Democrats") {
						demonameArray.push(candiname);
						demodataArray.push(primedata);
					} else {
						unrepunameArray.push(candiname);
						unrepudataArray.push(primedata);
					};
				});

				//chg data format for domo array
				demodataArray = _.map(demodataArray, function(i){return i.toFixed(0)});

				//sort republic
				var i;
				var x = unrepudataArray.length;
				for(i=0;i<x;i++) {
					var idx = unrepudataArray.indexOf(_.max(unrepudataArray));
					repudataArray.push(unrepudataArray[idx].toFixed(0));
					repunameArray.push(unrepunameArray[idx]);
					unrepudataArray.splice(idx,1);
					unrepunameArray.splice(idx,1);
				};

				//sort presidency arrays by data value
				console.log("unsorted name: ", unpresnameArray);
				console.log("unsorted value: ", unpresdataArray);
				var x = unpresdataArray.length;
				for(i=0;i<x;i++) {
					var idx = unpresdataArray.indexOf(_.max(unpresdataArray));
					presdataArray.push(unpresdataArray[idx].toFixed(0));
					presnameArray.push(unpresnameArray[idx]);
					prespartyArray.push(unprespartyArray[idx]);
					unpresdataArray.splice(idx,1);
					unpresnameArray.splice(idx,1);
					unprespartyArray.splice(idx,1);
				};
				console.log("sorted name: ", presnameArray);
				console.log("sorted value: ", presdataArray);
				
				////////////////////////////////////
				//create party list using d3.js   //
				////////////////////////////////////

				//clear divs
				d3.select(".page").html("");
				d3.select(".chart").html("");
				$(".page").append('<div class="bigdiv"><div class="quat q1"></div><div class="quat q2"></div><div class="quat q3"></div><div class="quat q4"></div></div>');
				$(".q2").append(biostring);
				$(".bio").hide();
				$(".info").show();


				var width = 500; //shared var =============================

				// var height = 250; //shared var

				///////////////////////
				/// chart 1 demo primaries
				//////////////////////

				//heading		
				// d3.select(".q3").append("h2").text("Democratic Primaries");	
				  d3.select(".q3").append("h2").text("         ");
				console.log("demonamearray:  ",demonameArray);
				console.log("demodataarray: ", demodataArray);
				//chart

				//scale demo only
				var demoWidthScale = d3.scale.linear()
								.domain([0,110])
								.range([0, width-140]); //max width

				//color scale demo only
				var demoColor = d3.scale.linear()
							.domain([1,70])
							.range(["firebrick","navy"]) ;

				var demoCanvas = d3.select('.q3')
						.append("svg")
						.attr("class", "demo-svg")
						.attr("width", width)
						.attr("height", 180)
						.append("g")
						.attr("transform", "translate(25,40)");

				var demoBars = demoCanvas.selectAll("rect")
						.data(demodataArray)
						.enter()
							.append("rect")

							.attr("class", function(d,i) {return "dem"+i;})

							.attr("height", 40)
							.attr("fill", function(d) {return demoColor(d)})
							.attr("y", function(d,i) {return i * 70})
							.attr("x", 120)
							.attr("width",0)
							.transition()
								.attr("width", function(d){ return demoWidthScale(d)})
								.duration(1000)
								.delay(500);

				var demoLabels = demoCanvas.selectAll("text.name")
						.data(demonameArray)
						.enter()
						// 
						.append("text")
						.attr("class", function(d,i) {return "dem"+i;})
						// .attr("class", "candi")
						.text(function(d) {return d})
						.attr("x", -5)
						.attr("y", function(d,i) {return i * 70+25})
						;

				var demolabelsVal = demoCanvas.selectAll("text.value")
						.data(demodataArray)
						.enter()
						.append("text")
						.attr("class", "candi")
						.text("")
						.attr("x", function(d) { return demoWidthScale(d)+125})
						.attr("y", function(d,i) {return i * 70+25;})
						.transition()
						.text(function(d) {return d+"%"})
						.delay(1500)
						;

				var demolabelsVal = demoCanvas.selectAll("text.value")
						.data(["Who will win the Democrat Primaries?"])
						.enter()
						.append("text")
						.attr("class", "chart_title")
						.text(function(d) {return d})
						.attr("x", function(d,i) { return i*130+0}) // { return i*130+200} { return i*130+270}
						.attr("y", -20)
						.style("fill", "b", "black")
						;


				///////////////////////
				/// chart 2 republican primaries
				//////////////////////

				//heading		

				 d3.select(".q4").append("h2").text("        ");	

				console.log("repunamearray:  ",repunameArray);
				console.log("repudataarray: ", repudataArray);
				//chart

				//scale demo only
				var repuWidthScale = d3.scale.linear()
								.domain([0,50])
								.range([0, width-140]); //max width

				//color scale demo only
				var repuColor = d3.scale.linear()
							.domain([1,40])
							.range(["crimson","navy"]) ;

				var repuCanvas = d3.select('.q4')
						.append("svg")
						.attr("class", "repu-svg")
						.attr("width", width)
						.attr("height", 360)
						.append("g")
						.attr("transform", "translate(25,40)");

				var repuBars = repuCanvas.selectAll("rect")
						.data(repudataArray)
						.enter()
							.append("rect")

							.attr("class", function(d,i) {return "rep"+i;})
							.attr("height", 40)
							.attr("fill", function(d) {return repuColor(d)})
							.attr("y", function(d,i) {return i * 50})
							.attr("x", 120)
							.attr("width",0)
							.transition()
								.attr("width", function(d){ return repuWidthScale(d)})
								.duration(1000)
								.delay(500);

				var repuLabels = repuCanvas.selectAll("text.name")
						.data(repunameArray)
						.enter()
						.append("text")
						.attr("class", function(d,i) {return "rep"+i;})
						// .attr("class", "candi")

						.text(function(d) {return d})
						.attr("x", -5)
						.attr("y", function(d,i) {return i * 50+25})
						;

				var repulabelsVal = repuCanvas.selectAll("text.value")
						.data(repudataArray)
						.enter()
						.append("text")
						.attr("class", "candi")
						.text("")
						.attr("x", function(d) {return repuWidthScale(d)+125})
						.attr("y", function(d,i) {return i * 50+25;})
						.transition()
						.text(function(d) {return d+"%"})
						.delay(1500)
						;

				var repulabelsVal = repuCanvas.selectAll("text.value")
						.data(["Who will win the Republican Primaries?"])
						.enter()
						.append("text")
						.attr("class", "chart_title")
						.text(function(d) {return d})
						.attr("x", function(d,i) { return i*130+0}) // { return i*130+200} { return i*130+270}
						.attr("y", -20)
						.style("fill", "b", "black")
						;



				///////////////////////
				/// chart 3 presidency
				//////////////////////

				//heading		
				// d3.select(".q3").append("h2").text("Who will be the President?");
				 // d3.select(".q3").append("h2").text("     fff   ");		
				console.log("presnamearray:  ",presnameArray);
				console.log("presdataarray: ", presdataArray);
				console.log("prespartyarray: ", prespartyArray)
				//chart

				//scale
				var presWidthScale = d3.scale.linear()
								.domain([0,70])
								.range([0, width-140]); //max width


				var presCanvas = d3.select('.q1')

						.append("svg")
						.attr("class", "pres-svg")
						.attr("width", width)
						.attr("height", 500)  //increase height
						.append("g")
						.attr("transform", "translate(25,60)");


				var presBars = presCanvas.selectAll("rect.bar")
						.data(presdataArray)
						.enter()
							.append("rect")
							.attr("height", 40)
							.attr("class", function(d,i) {return "pres"+i;})
							.style("fill", function(d,i) {
								if(prespartyArray[i] == "Democrats") {
									return "navy"
								} else {
									return "firebrick"
								};
								})
							.attr("y", function(d,i) {return i * 50})
							.attr("x", 120)
							.attr("width",0)
							.transition()
								.attr("width", function(d){ return presWidthScale(d)})
								.duration(1000)
								.delay(500);

				var presLabels = presCanvas.selectAll("text.name")
						.data(presnameArray)
						.enter()
						.append("text")

						.attr("class", function(d,i) {return "pres"+i;})
						// .attr("class", "candi")

						.text(function(d) {return d})
						.attr("x", -5)
						.attr("y", function(d,i) {return i * 50+25})
						;

				var preslabelsVal = presCanvas.selectAll("text.value")
						.data(presdataArray)
						.enter()
						.append("text")
						.attr("class", "candi")
						.text("")
						.attr("x", function(d) {return presWidthScale(d)+125})
						.attr("y", function(d,i) {return i * 50+25;})
						.transition()
						.text(function(d) {return d+"%"})
						.delay(1500)
						;

				var prespartyLegend = presCanvas.selectAll("rect.legend")
						.data(["navy","firebrick"])
						.enter()
							.append("rect")
							.attr("height", 30)
							.attr("width", 120)
							.attr("class","legend")
							.style("fill", function(d){
								return d
							})
							.attr("y",-50)
							.attr("x", function(d,i) { return i*130+170}) // { return i*130+250}

							;
				var prespartyLegendLabels = presCanvas.selectAll("text.legend")
						.data(["Democrats","Republicans"])
						.enter()
						.append("text")
						.attr("class", "legend-name")
						.text(function(d) {return d})
						.attr("x", function(d,i) { return i*130+200}) // { return i*130+200} { return i*130+270}
						.attr("y", -30)
						.style("fill", "white")
						;

				var prespartyLegendTitle = presCanvas.selectAll("text.legend")
						.data(["Who will be president?"])
						.enter()
						.append("text")
						.attr("class", "chart_title")
						.text(function(d) {return d})
						.attr("x", function(d,i) { return i*130+0}) // { return i*130+200} { return i*130+270}
						.attr("y", -30)
						.style("fill", "b", "black")
						;



			}
		});
	}
});
