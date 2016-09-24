angular.module('octoWaffle')
.controller('RoomController', function($scope, roomDetails, RoomStorageService){
	$scope.room = roomDetails;
	$scope.todos = RoomStorageService.getAllTodosForId(roomDetails.id);
	$scope.addTodo = function(todoText){
		var roomId = $scope.room.id;
		var todo = RoomStorageService.addTodo(roomId, todoText.trim());
		if(!todo){
			console.log('Error adding todo for Room '+roomId+'. Returned:');
			return console.log(todo);
		}
		$scope.todos = RoomStorageService.getAllTodosForId(roomId)
	};

	$scope.toggleTodo = function(todoId, todoState){
		RoomStorageService.toggleTodo(parseInt(roomDetails.id), parseInt(todoId), todoState);
	};

	$scope.deleteTodo = function(todoId){
		RoomStorageService.deleteTodo(parseInt(roomDetails.id), parseInt(todoId));
		$scope.todos = RoomStorageService.getAllTodosForId(roomDetails.id);
	};
});