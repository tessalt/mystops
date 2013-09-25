/*global mystops, Backbone, JST*/

mystops.Views.IndexView = Backbone.View.extend({

  el: "#mystops",

  initialize: function() {
    $("#select").hide();
    this.$el.show();
    this.listenTo(mystops.Collections.savedStops, 'add', this.showSavedStop);
    this.listenTo(mystops.Collections.savedStops, 'all', this.showAllSavedStops);
    mystops.Collections.savedStops.fetch();
  },

  showSavedStop: function (stop) {
    var view = new mystops.Views.SavedStopView({ model: stop });
    this.$el.append( view.render().el );
    this.getStopPrediction(stop, view);
  },

  showAllSavedStops: function () {
    this.$el.html('');
    var self = this;
    mystops.Collections.savedStops.each(function (stop) {
      self.showSavedStop(stop);
    })
  },

  getStopPrediction: function (stop, view) {
    var self = this;
    var predictions = new mystops.Collections.PredictionCollection();
    var routeCode = stop.get('routeTag');
    var stopCode = stop.get('stopTag');
    predictions.fetch({
      data: { r: routeCode, s: stopCode },
      success: function() {
        predictions.each(function (prediction) {
          self.showPrediction(prediction, view);
        });
      }
    });
  },

  showPrediction: function (prediction, view) {
    var predictionView = new mystops.Views.PredictionView({ model: prediction });
    view.$el.find('ul').append(predictionView.render().el);
  }

});