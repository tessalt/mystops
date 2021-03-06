/*global mystops, Backbone, JST*/

mystops.Views.SavedStopView = Backbone.View.extend({

  template: _.template($("#saved-stop-template").html()),

  className: 'saved-stop',

  events: {
    'click .delete' : 'clear',
    'click .tag' : 'toggleEdit',
    'click .save-tag' : 'saveTag'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  clear: function() {
    this.model.destroy();
  },

  toggleEdit: function() {
    this.$el.find('.edit-tag-input').toggle();
    this.$el.find('.tag').toggle();
    this.$el.find('.save-tag').toggle();
    this.$el.find('.edit-tag').toggle();
  },

  saveTag: function() {
    var input = this.$el.find('.edit-tag-input').val().trim();
    this.model.save({tag: input});
  }

});
