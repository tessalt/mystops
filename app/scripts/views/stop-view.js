/*global mystops, Backbone, JST*/

mystops.Views.StopView = Backbone.View.extend({

  template: _.template($("#option-template").html()),

  tagName: 'option',

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.val(this.model.get('tag'));
    return this;
  }

});
