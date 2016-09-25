angular.module('octoWaffle')
.controller('MainController', function($scope, RoomStorageService, $state){
	$scope.rooms = RoomStorageService.getAllRooms();
	console.log($scope.rooms);
	$scope.moveToRoom = function (roomId){
		$state.go('room', { id: roomId});
	};

	$scope.addRoom = function(roomName){ 
		var newlyAddedRoom = RoomStorageService.createRoom(roomName);
		
		if(!newlyAddedRoom){
			return console.log('Room Creation Failed.');
		}
		$scope.rooms = RoomStorageService.getAllRooms();
		$scope.newRoomName = "";
	};

	$scope.deleteRoom = function (roomId){
		console.log('trying to delete room: ' + roomId);
	};

	$scope.addTodoToRoom = function(roomId, todoText){
		var todo = RoomStorageService.addTodo(roomId, todoText.trim());
		console.log("Adding " + todoText + " To room " + roomId);
		if(!todo){
			console.log('Error adding todo for Room '+roomId+'. Returned:');
			return console.log(todo);
		}
		$scope.newTodo = "";
		$('.ui.success.message').show();
	};

	$scope.deleteRoom = function(roomId) {
		console.log('deleting?');
		var deleted = RoomStorageService.deleteRoom(roomId);
		$scope.rooms = RoomStorageService.getAllRooms();
	};
});