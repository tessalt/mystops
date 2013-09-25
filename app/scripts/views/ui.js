mystops.Views.UIView = Backbone.View.extend ({

  el: 'body',

  events: {
    'click .nav-toggle' : 'toggleNav'
  },

  initialize: function() {

  },

  toggleNav: function(e) {
    this.$el.find(".app-nav-menu").slideToggle();
  }

});