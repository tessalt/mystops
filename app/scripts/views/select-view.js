/*global mystops, Backbone, JST*/

mystops.Views.SelectView = Backbone.View.extend({

  el: "#select",

  events: {
    'change #routes' : 'selectDirection',
    'change #directions' : 'selectStop',
    'click #add_stop' : 'addSavedStop'
  },

  initialize: function() {
    this.listenTo(mystops.Collections.routes, 'add', this.showRoute);
    this.listenTo(mystops.Collections.directions, 'sync', this.showDirections);
    this.listenTo(mystops.Collections.stops, 'sync', this.showStops);
    this.listenTo(mystops.Collections.savedStops, 'all', this.showAllSavedStops);
    this.listenTo(mystops.Collections.savedStops, 'add', this.resetForm);
    mystops.Collections.routes.fetch();
    mystops.Collections.savedStops.fetch();
  },

  showAllRoutes: function() {
    mystops.Collections.routes.each(this.showRoute, this);
  },

  showRoute: function(route) {
    var view = new mystops.Views.RouteView({ model: route });
    $("#routes").append(view.render().el);
  },

  selectDirection: function() {
    var chosenRoute = $("#routes option").not(function() { return !this.selected }).val();
    mystops.Collections.directions.fetch({ data: { r: chosenRoute } });
  },

  showDirections: function() {
    $("#directions").html("<option>Select a Direction</option>");
    mystops.Collections.directions.each(function(direction){
      var view = new mystops.Views.DirectionView({model: direction});
      $("#directions").append(view.render().el);
    });
  },

  selectStop: function() {
    var chosenRoute = $("#routes option").not(function() { return !this.selected }).val();
    mystops.Collections.stops.fetch( { data: { r: chosenRoute } });
  },

  showStops: function() {
    var chosenDir = $("#directions option").not(function() { return !this.selected }).val();
    $("#stops").html("<option>Select a Stop</option>");
    mystops.Collections.stops.each(function(stop){
      if (chosenDir === stop.get('direction')) {
        var view = new mystops.Views.StopView({model: stop});
        $("#stops").append(view.render().el);
      }
    });
  },

  addSavedStop: function() {
    var selectedRoute = $("#routes option").not(function() { return !this.selected }),
        selectedDirection = $("#directions option").not(function() { return !this.selected }),
        selectedStop = $("#stops option").not(function() { return !this.selected });
    var newSavedStop = new mystops.Models.SavedStopModel({
        routeTag: selectedRoute.val(),
        directionTag: selectedDirection.val(),
        stopTag: selectedStop.val(),
        routeName: selectedRoute.text(),
        directionName: selectedDirection.text(),
        stopName: selectedStop.text(),
        tag: ""
    });
    var validModel = this.validate(newSavedStop);
    if (validModel) {
      mystops.Collections.savedStops.create(newSavedStop);
    }
  },

  showAllSavedStops: function() {
    $("#saved_stops").html('');
    mystops.Collections.savedStops.each(this.showSavedStop, this);
  },

  showSavedStop: function(savedStop) {
    var view = new mystops.Views.SavedStopView({ model: savedStop });
    $("#saved_stops").append( view.render().el );
  },

  validate: function(model) {
    var validationEl = $("#validation");
    validationEl.html("");
    if (model.get('stopTag') === "" || model.get('stopTag') === "Select a Stop") {
      validationEl.append("<li>Please select a stop</li>");
      return false;
    } else if (mystops.Collections.savedStops.length >= 5) {
      validationEl.append("<li>Maximum of 5 stops my be selected</li>");
      return false;
    } else if (this.isDuplicate(model)) {
      validationEl.append("<li>You've already added that stop!</li>");
      return false;
    } else {
      return true;
    }
  },

  isDuplicate: function(model) {
    var match = false;
    mystops.Collections.savedStops.each(function(savedStop){
      if (model.get('stopTag') === savedStop.get('stopTag')) {
        match = true;
      }
    });
    return match;
  },

  resetForm: function() {
    $("#routes option:first-child").prop('selected', true);
    $("#directions option:first-child").prop('selected', true);
    $("#stops option:first-child").prop('selected', true);
  }

});
