/* global describe, it */
var task;

(function () {
  'use strict';

  describe('My Task Object', function () {

    describe('Creating a New Task', function () {
    	
    	beforeEach( function() {
	  		task = new Task();
	  	});

      it('should be an instance of Task', function () {
      	expect(task).to.be.an.instanceof(Task);
      });

      it('should have a name', function () {
      	expect(task.name).to.equal(this.name);
      });

      it('should have a due date', function () {
      	expect(task.dueDate).to.equal(this.dueDate || 'no due date');
      });

      it('should have a default Status of open', function () {
      	expect(task.status).to.equal('open');
      });

    });

  });

})();
