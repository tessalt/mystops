/*global mystops, Backbone*/

mystops.Collections.PredictionCollection = Backbone.Collection.extend({

  model: mystops.Models.PredictionModel,

  url: 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc',

  parse: function (data) {
    var parsed = [];
    $(data).find('direction').each(function (index) {
      var dataDir = $(this).attr('title');
      $(this).find('prediction').each(function (index) {
        var dataMins = $(this).attr('minutes');
        parsed.push({minutes: dataMins, direction: dataDir});
      });
    });
    return parsed;
  },

  fetch: function (options) {
    options = options || {};
    options.dataType = "xml";
    Backbone.Collection.prototype.fetch.call(this, options);
  }

});
