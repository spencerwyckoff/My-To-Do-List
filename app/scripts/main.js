//Variables
var grabName = $('#newTaskInput');
var grabDate = $('#dueDateInput');

//Create Task Model in Backbone
var Task = Backbone.Model.extend({

	initialize: function() {

		var name = this.get('name');
		var dueDate = this.get('dueDate');
		console.log(name + ' is a new task');
		console.log(dueDate + ' is the due date');

	},

	idAttribute: '_id',

	defaults: {
		name: '',
		dueDate: '',
		status: 'open'
	},

	toggleStatus: function () {
		if (this.attributes.status === 'open') {
			this.attributes.status = 'completed';
		} else {
			this.attributes.status = 'open';
		}
	}

});

//Create Task Collection in Backbone
var TaskCollection = Backbone.Collection.extend({

	initialize: function() {
		console.log('The task collection was created');
	},

	model: Task

});

//Instances
var allTasks = new TaskCollection(); 
// //Add a new Task
//  var addNewTask = function (task) {
//     newTasks.task.push(task);
//     newTaskArea.append(taskTemplateFunc(task));
//   };

//SUBMIT BUTTON
$('#submit').on('click', function(e) {
	e.preventDefault();	
//grab values from fields
	var getName = grabName.val();
	var getDate = grabDate.val();
//reset fields to blank
	grabName.val('');
	grabDate.val('');
//create a new Task Model and store name & date values
	var newTask = new Task ({name: getName, dueDate: getDate});
	console.log(newTask);
//add the new Task Model to the Task Collection
	allTasks.add(newTask);
//display array in HTML
	var newTasksHTML = template(newTasks);
	newTaskArea.html(newTasksHTML);
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
$('.completedTasksList').on('click','li div', function(event) {
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



