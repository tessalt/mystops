/*global mystops, Backbone*/

mystops.Collections.SavedStopCollection = Backbone.Collection.extend({

    model: mystops.Models.SavedStopModel,

    localStorage: new Backbone.LocalStorage("MyStops")

});
