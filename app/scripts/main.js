//Variables
var grabName = $('#newTaskInput');
var grabDate = $('#dueDateInput');

//Create Task Model in Backbone
var Task = Backbone.Model.extend({

	initialize: function() {

		var name = this.get('name');
		var dueDate = this.get('dueDate');

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
	},

	model: Task,

	url: 'https://tiy-atl-fe-server.herokuapp.com/collections/sw-to-do-list'

});

//Instances
var allTasks = new TaskCollection(); 

//Handlebars Template
var newTemplateTask = Handlebars.templates.newTask;

//PAGE LOAD - Pull Existing Tasks and Add to DOM
var pageLoad = allTasks.fetch().done( function() {
	console.log('Tasks have been fetched.');

	allTasks.each( function(a) {
		var templateTaskHTML = newTemplateTask(a.attributes);
		$('.newTasksList').append(templateTaskHTML);
	});	

});


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
//add the new Task Model to the Task Collection
	allTasks.add(newTask);
//add the new Task Collection HTML to the page
	var templateTaskHTML = templateTask(newTask.attributes);
		$('.newTasksList').append(templateTaskHTML);
//save newTask to server URL
	newTask.save().done( function () {
		console.log('Task was saved to the server.');
	});

});


//TOGGLE NEW

$('.newTasksList').on('click', function(event) {
	event.preventDefault();
//Grab the ID of the clicked <li>
	var thisTask = event.target;
	var thisTaskID = thisTask.id;
//In the Collection, find where the id === the clicked task ID
	var thisTaskInstance = _.findWhere(allTasks.models, { id: thisTaskID});
//Change the status of matching ID to completed.
	thisTaskInstance.set({ status: 'completed'} );
//Add the new class "completed" to the HTML element
	$(thisTask).removeClass().addClass(thisTaskInstance.attributes.status);
//Detach it from New Task List and add it to Completed Task List
	var detachCompletedTask = $(thisTask).detach();
	var appendCompletedTask = $('.completedTasksList').append(detachCompletedTask);
});


//TOGGLE COMPLETED

$('.completedTasksList').on('click', function(event) {
	event.preventDefault();
//Grab the ID of the clicked <li>
	var thisTask = event.target;
	var thisTaskID = thisTask.id;
//In the Collection, find where the id === the clicked task ID
	var thisTaskInstance = _.findWhere(allTasks.models, { id: thisTaskID});
//Change the status of matching ID to completed.
	thisTaskInstance.set({ status: 'open'} );
//Add the new class "completed" to the HTML element
	$(thisTask).removeClass().addClass(thisTaskInstance.attributes.status);
//Detach it from New Task List and add it to Completed Task List
	var detachCompletedTask = $(thisTask).detach();
	var appendCompletedTask = $('.newTasksList').prepend(detachCompletedTask);
});



