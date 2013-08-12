/*global mystops, Backbone, JST*/

mystops.Views.SelectView = Backbone.View.extend({

  el: "body",

  events: {
    'change #routes' : 'selectDirection'
  },

  initialize: function() {
    mystops.Collections.routes.fetch();
    this.listenTo(mystops.Collections.routes, 'add', this.showRoute);
    this.listenTo(mystops.Collections.directions, 'sync', this.showDirections);
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
  }

});
