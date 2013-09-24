/*global mystops, Backbone, JST*/

mystops.Views.SavedStopView = Backbone.View.extend({

  template: JST['app/scripts/templates/saved_stop.ejs'],

  className: 'panel',

  events: {
    'click .delete' : 'clear',
    'click .edit-tag' : 'toggleEdit',
    'click .save-tag' : 'saveTag',
    'click .edit-tag-input' : 'toggleEdit'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  clear: function() {
    this.model.destroy();
  },

  toggleEdit: function() {
    $('.edit-tag-input').toggle();
    $('.tag').toggle();
    $('.save-tag').toggle();
    $('.edit-tag').toggle();
  },

  saveTag: function() {
    var input = $('.edit-tag-input').val().trim();
    this.model.save({tag: input});
  }

});
