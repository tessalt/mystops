/*global mystops, Backbone, JST*/

mystops.Views.RouteView = Backbone.View.extend({

  template: JST['app/scripts/templates/route.ejs'],

  tagName: 'option',

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.val(this.model.get('tag'));
    return this;
  }

});
