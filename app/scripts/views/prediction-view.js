/*global mystops, Backbone, JST*/

mystops.Views.PredictionView = Backbone.View.extend({

  template: JST['app/scripts/templates/prediction.ejs'],

  tagName: 'li',

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});
