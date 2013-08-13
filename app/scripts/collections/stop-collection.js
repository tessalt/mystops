/*global mystops, Backbone*/

mystops.Collections.StopCollection = Backbone.Collection.extend({

  model: mystops.Models.StopModel,

  url: 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc',

  parse: function (data) {
    var parsed = [];
    var directions = {};
    $(data).find('direction').each(function(index){
      var dataDir = $(this).attr("tag");
      directions[dataDir] = [];
      $(this).find('stop').each(function(jndex){
        dataTag = $(this).attr("tag");
        directions[dataDir][jndex] = dataTag;
      });
    });
    $(data).find('route > stop').each(function (index) {
      var dataTag = $(this).attr('tag');
      var dataTitle = $(this).attr('title');
      var dataDir = "";
      for (var direction in directions) {
        if (directions[direction].indexOf(dataTag) > -1) {
          dataDir = direction;
        }
      }
      parsed.push({tag: dataTag, title: dataTitle, direction: dataDir});
    });
    return parsed;
  },

   fetch: function (options) {
    options = options || {};
    options.dataType = "xml";
    Backbone.Collection.prototype.fetch.call(this, options);
  }

});
