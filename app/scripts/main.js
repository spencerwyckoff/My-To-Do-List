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
	console.log(newTask);
//display array in HTML
	// var newTasksHTML = template(newTasks);
	// newTaskArea.html(newTasksHTML);
});

//CHECKBOX on click, toggle status
$('.newTasksList').on('click','li', function(event) {
//change task status to Completed
	event.preventDefault();	
	var thisTask = event.target;
	var thisTaskID = Number(thisTask.id);
	console.log(thisTaskID);

	var thisTaskInstance = _.findWhere(newTasks.task, { id: thisTaskID });

	thisTaskInstance.toggleStatus();
	console.log(thisTaskInstance);

	$(thisTask).removeClass().addClass(thisTaskInstance.status);	
});





