angular.module('octoWaffle')
.controller('MainController', function($scope, RoomStorageService){
	$scope.rooms = RoomStorageService.getAllRooms();

	$scope.addRoom = function(roomName){ 
		var newlyAddedRoom = RoomStorageService.createRoom(roomName);
		
		if(!newlyAddedRoom){
			return console.log('Room Creation Failed.');
		}
		$scope.rooms = RoomStorageService.getAllRooms();
	};
});