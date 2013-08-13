/*global mystops, Backbone, JST*/

mystops.Views.SelectView = Backbone.View.extend({

  el: "body",

  events: {
    'change #routes' : 'selectDirection',
    'change #directions' : 'selectStop'
  },

  initialize: function() {
    mystops.Collections.routes.fetch();
    this.listenTo(mystops.Collections.routes, 'add', this.showRoute);
    this.listenTo(mystops.Collections.directions, 'sync', this.showDirections);
    this.listenTo(mystops.Collections.stops, 'sync', this.showStops);
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
  }

});
