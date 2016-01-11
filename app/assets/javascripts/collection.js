//collection.js

var app = app || {};

app.CandidatesList = Backbone.Collection.extend({
  url: '/candidates',
  model: app.Candidate,
});

app.PartiesList = Backbone.Collection.extend({
  url: '/parties',
  model: app.Party
});