(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['tasks'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "	<li id=\"<%= id %>\" class=\"<%= status %>\">\n	  <div class=\"taskContainer\">\n	    <span class=\"theTask\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n	    <span class=\"smallDate\">"
    + escapeExpression(((helper = (helper = helpers.dueDate || (depth0 != null ? depth0.dueDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dueDate","hash":{},"data":data}) : helper)))
    + "</span>\n	  </div>\n	  <div class=\"completeButton\">\n	  </div>\n	</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.task : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true});
})();