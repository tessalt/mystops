/*global mystops, $*/

window.mystops = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
      this.Collections.routesCollection = new this.Collections.RoutesCollection();
      new mystops.Views.SelectView();
    }
};

/* Order and include as you please. */
require('.tmp/scripts/templates');
require('app/scripts/views/*');
require('app/scripts/models/*');
require('app/scripts/collections/*');
require('app/scripts/routers/*');

$(document).ready(function () {
    mystops.init();
});
