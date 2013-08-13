/*global mystops, Backbone*/

mystops.Models.SavedStopModel = Backbone.Model.extend({

  validate: function(attrs) {
    if (attrs.stopTag === "") {
      return "Needs Stop";
    }
  }
});

/*
  {
    routeTag: "",
    directionTag: "",
    stopTag: "",
    routeName: "",
    directionName: "",
    stopName: ""
  }
*/