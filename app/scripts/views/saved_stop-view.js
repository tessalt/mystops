/*global mystops, Backbone, JST*/

mystops.Views.SavedStopView = Backbone.View.extend({

  template: JST['app/scripts/templates/saved_stop.ejs'],

  tagName: 'li',

  events: {
    'click .delete' : 'clear'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  clear: function() {
    this.model.destroy();
  }

});
