angular.module('octoWaffle')
.controller('RoomController', function($scope, roomDetails, RoomStorageService, $state){
	$scope.room = roomDetails;
	$scope.todos = RoomStorageService.getAllTodosForId(roomDetails.id);
	$scope.addTodo = function(todoText){
		if ($scope.newTodoText.length) {
			var roomId = $scope.room.id;
			var todo = RoomStorageService.addTodo(roomId, todoText.trim());
			if(!todo){
				console.log('Error adding todo for Room '+roomId+'. Returned:');
				return console.log(todo);
			}
			$scope.todos = RoomStorageService.getAllTodosForId(roomId)
			$scope.newTodoText = '';
		}
	};

	$scope.toggleTodo = function(todoId, todoState){
		RoomStorageService.toggleTodo(parseInt(roomDetails.id), parseInt(todoId), todoState);
	};

	$scope.deleteTodo = function(todoId){
		RoomStorageService.deleteTodo(parseInt(roomDetails.id), parseInt(todoId));
		$scope.todos = RoomStorageService.getAllTodosForId(roomDetails.id);
	};

	$scope.triggerDeleteDialog = function(){
		$('.ui.basic.modal').modal('show');
	};

	$scope.deleteRoom = function() {
		var deleted = RoomStorageService.deleteRoom(roomDetails.id);
		if(deleted){
			$state.go('main');
		}
	};
});