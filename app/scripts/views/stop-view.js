/*global mystops, Backbone, JST*/

mystops.Views.StopView = Backbone.View.extend({

  template: JST['app/scripts/templates/option.ejs'],

  tagName: 'option',

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.val(this.model.get('tag'));
    return this;
  }

});
