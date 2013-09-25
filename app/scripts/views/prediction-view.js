/*global mystops, Backbone, JST*/

mystops.Views.PredictionView = Backbone.View.extend({

  template: _.template($("#prediction-template").html()),

  tagName: 'li',

  className: 'list-group-item',

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});
