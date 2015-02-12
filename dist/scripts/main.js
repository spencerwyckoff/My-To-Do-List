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
//DECLARE VARIABLES
var newTasks = {
	task: []
};
var newTaskArea = $('.newTasksList');
var completedTaskArea = $('.completedTaskList');
var newTaskInput = $('#newTaskInput');
var newDateInput = $('#dueDateInput');

var taskTemplate = $('#taskTemp').html();
var taskTemplateFunc = _.template(taskTemplate);


//TASK CONSTRUCTOR
var Task = function(name, dueDate) {
	this.name = name;
	this.dueDate = dueDate || "no due date";
	this.id = _.random(0, 10000);
	
	this.changeDueDate = function(date) {
		this.dueDate = date;
	};

	this.status = 'open';

	this.toggleStatus = function() {
		if (this.status === 'open') {
			this.status = 'completed'; 
		} else {
			this.status = 'open';
		}
	};

};

//HANDLEBARS TEMPLATE - New Tasks
	// var template = Handlebars.templates.tasks;
	// var newTasksHTML = template(newTasks);
	// $('.newTasksList').html(newTasksHTML);

//ADD A NEW TASK
 var addNewTask = function (task) {
    newTasks.task.push(task);
    newTaskArea.append(taskTemplateFunc(task));
  };

//SUBMIT BUTTON
$('#submit').on('click', function(e) {
	e.preventDefault();	
//grab values from fields
	var getTask = newTaskInput.val();
	var getDate = newDateInput.val();
//reset fields to blank
	newTaskInput.val('');
	newDateInput.val('');
//create a new task object and push to array
	var newTask = new Task (getTask, getDate);
	addNewTask(newTask);
//display array in HTML
	// var newTasksHTML = template(newTasks);
	// newTaskArea.html(newTasksHTML);
});

//TOGGLE COMPLETE
$('.newTasksList').on('click','li', function(event) {
//change task status to Completed
	event.preventDefault();	
	var thisTask = event.target;
	var thisTaskID = Number(thisTask.id);

	var thisTaskInstance = _.findWhere(newTasks.task, { id: thisTaskID });

	thisTaskInstance.toggleStatus();

	$(thisTask).removeClass().addClass(thisTaskInstance.status);

	var detachNewTask = $(thisTask).detach();
	var appendCompletedTask = $('.completedTasksList').append(detachNewTask);
});

//TOGGLE NEW 
$('.completedTasksList').on('click','li', function(event) {
//change task status to Completed
	event.preventDefault();	
	var thisTask = event.target;
	var thisTaskID = Number(thisTask.id);

	var thisTaskInstance = _.findWhere(newTasks.task, { id: thisTaskID });

	thisTaskInstance.toggleStatus();

	$(thisTask).removeClass().addClass(thisTaskInstance.status);

	var detachCompletedTask = $(thisTask).detach();
	var appendCompletedTask = $('.newTasksList').append(detachCompletedTask);

});




//DELETE

var deleteButton = $('div.deleteButton').css('color','yellow');
console.log(deleteButton);






