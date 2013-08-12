/*global mystops, Backbone*/

mystops.Collections.DirectionCollection = Backbone.Collection.extend({

  model: mystops.Models.DirectionModel,

  url: 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc',

  parse: function (data) {
    var parsed = [];
    $(data).find('direction').each(function (index) {
      var dataTitle = $(this).attr('title');
      var dataTag = $(this).attr('tag');
      parsed.push({title: dataTitle, tag: dataTag});
    })
    return parsed;
  },

  fetch: function (options) {
    options = options || {};
    options.dataType = "xml";
    Backbone.Collection.prototype.fetch.call(this, options);
  }

});
