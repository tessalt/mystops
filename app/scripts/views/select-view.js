/*global mystops, Backbone, JST*/

mystops.Views.SelectView = Backbone.View.extend({

  el: "body",

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
    var chosenRoute = $("#routes option:selected").val();
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
    var chosenRoute = $("#routes option:selected").val();
    mystops.Collections.stops.fetch( { data: { r: chosenRoute } });
  },

  showStops: function() {
    var chosenDir = $("#directions option:selected").val();
    $("#stops").html("<option>Select a Stop</option>");
    mystops.Collections.stops.each(function(stop){
      if (chosenDir === stop.get('direction')) {
        var view = new mystops.Views.StopView({model: stop});
        $("#stops").append(view.render().el);
      }
    });
  },

  addSavedStop: function() {
    var selectedRoute = $("#routes option:selected"),
        selectedDirection = $("#directions option:selected"),
        selectedStop = $("#stops option:selected");
    var newSavedStop = new mystops.Models.SavedStopModel({
        routeTag: selectedRoute.val(),
        directionTag: selectedDirection.val(),
        stopTag: selectedStop.val(),
        routeName: selectedRoute.text(),
        directionName: selectedDirection.text(),
        stopName: selectedStop.text()
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
    validationEl.html('');
    var currentStops = [];
    mystops.Collections.savedStops.each(function(savedStop){
      currentStops.push(savedStop.get('stopTag'));
    });
    if (!model.get('stopTag')) {
      validationEl.append("<li>Please select a stop</li>");
      return false;
    } else if (currentStops.length > 5) {
      validationEl.append("<li>Maximum of 5 stops my be selected</li>");
      return false;
    } else if (currentStops.indexOf(model.get('stopTag')) > -1) {
      validationEl.append("<li>You've already added that stop!</li>");
      return false;
    } else {
      return true;
    }
  }

});
