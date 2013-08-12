/*global mystops, Backbone, JST*/

mystops.Views.SelectView = Backbone.View.extend({

  el: "body",

  initialize: function() {
    mystops.Collections.routesCollection.fetch();
    this.listenTo(mystops.Collections.routesCollection, 'sync', this.showRoutes);
  },

  showRoutes: function() {
    mystops.Collections.routesCollection.each(function(e){
      var view = new mystops.Views.RouteView({model: e});
      $("#routes").append(view.render().el);
    })
  }

});
