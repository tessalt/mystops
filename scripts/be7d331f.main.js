!function(){window.mystops={Models:{},Collections:{},Views:{},Routers:{},init:function(){this.Collections.routesCollection=new this.Collections.RoutesCollection,new mystops.Views.SelectView}}}(),function(){this.JST=this.JST||{},this.JST["app/scripts/templates/route.ejs"]=function(obj){obj||(obj={});var __t,__p="";with(_.escape,obj)__p+=(null==(__t=title)?"":__t)+"\n";return __p},this.JST["app/scripts/templates/select.ejs"]=function(obj){obj||(obj={});var __p="";with(_.escape,obj)__p+="<p>Your content here.</p>\n\n";return __p}}(),function(){mystops.Views.RouteView=Backbone.View.extend({template:JST["app/scripts/templates/route.ejs"],tagName:"option",render:function(){return this.$el.html(this.template(this.model.toJSON())),this.$el.val(this.model.get("tag")),this}})}(),function(){mystops.Views.SelectView=Backbone.View.extend({el:"body",initialize:function(){mystops.Collections.routesCollection.fetch(),this.listenTo(mystops.Collections.routesCollection,"sync",this.showRoutes)},showRoutes:function(){mystops.Collections.routesCollection.each(function(a){var b=new mystops.Views.RouteView({model:a});$("#routes").append(b.render().el)})}})}(),function(){mystops.Models.RoutesModel=Backbone.Model.extend({})}(),function(){mystops.Collections.RoutesCollection=Backbone.Collection.extend({model:mystops.Models.RoutesModel,url:"http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc",parse:function(a){var b=[];return $(a).find("route").each(function(){var a=$(this).attr("tag"),c=$(this).attr("title");b.push({tag:a,title:c})}),b},fetch:function(a){a=a||{},a.dataType="xml",Backbone.Collection.prototype.fetch.call(this,a)}})}(),function(){$(document).ready(function(){mystops.init()})}();