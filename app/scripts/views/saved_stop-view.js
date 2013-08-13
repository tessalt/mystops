/*global mystops, Backbone, JST*/

mystops.Views.SavedStopView = Backbone.View.extend({

  template: JST['app/scripts/templates/saved_stop.ejs'],

  tagName: 'li',

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});
