angular.module('octoWaffle')
.controller('RoomController', function($scope, roomId){
	$scope.roomId = roomId;
	console.log('I\'m a room!');
});