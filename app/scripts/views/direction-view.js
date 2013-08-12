/*global mystops, Backbone, JST*/

mystops.Views.DirectionView = Backbone.View.extend({

  template: JST['app/scripts/templates/direction.ejs'],

  tagName: 'option',

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.val(this.model.get('tag'));
    return this;
  }

});
