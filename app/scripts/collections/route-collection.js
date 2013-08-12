/*global mystops, Backbone*/

mystops.Collections.RouteCollection = Backbone.Collection.extend({

  model: mystops.Models.RouteModel,

  url: 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc',

  parse: function (data) {
    var parsed = [];
    $(data).find('route').each(function (index) {
      var dataTag = $(this).attr('tag');
      var dataTitle = $(this).attr('title');
      parsed.push({tag: dataTag, title: dataTitle});
    })
    return parsed;
  },

  fetch: function (options) {
    options = options || {};
    options.dataType = "xml";
    Backbone.Collection.prototype.fetch.call(this, options);
  }

});
