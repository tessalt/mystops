/*global mystops, $*/

window.mystops = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    this.Collections.routes = new this.Collections.RouteCollection();
    this.Collections.directions = new this.Collections.DirectionCollection();
    this.Collections.stops = new this.Collections.StopCollection();
    this.Collections.savedStops = new mystops.Collections.SavedStopCollection();
    // new mystops.Views.SelectView();
    // new mystops.Views.IndexView();
    new mystops.Views.UIView();
  }
};

mystops.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'index',
    'index' : 'index',
    'select' : 'select'
  },
  index: function() {
    new mystops.Views.IndexView();
  },
  select: function() {
    new mystops.Views.SelectView();
  }
});


/* Order and include as you please. */
require('.tmp/scripts/templates');
require('app/scripts/views/*');
require('app/scripts/models/*');
require('app/scripts/collections/*');
require('app/scripts/routers/*');

$(document).ready(function () {
  mystops.init();
  var appRouter = new mystops.Routers.AppRouter;
  Backbone.history.start();
});
