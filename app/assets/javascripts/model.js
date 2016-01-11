//model.js

var app = app || {};

app.Candidate = Backbone.Model.extend({
  url: '/candidates',
});

app.Party = Backbone.Model.extend({
  url: '/parties'
});