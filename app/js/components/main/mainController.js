angular.module('octoWaffle')
.controller('MainController', function($scope, RoomStorageService, $state, toasty){
	$scope.rooms = RoomStorageService.getAllRooms();
	$scope.deleteConfirmModal = $('#delete-confirm-modal');

	var deleteRoom = function(roomId, roomName) {
		var deleted = RoomStorageService.deleteRoom(roomId);
		$scope.$apply(function(){
			$scope.rooms = RoomStorageService.getAllRooms();
			toasty.info({title: 'Deleted \'' + roomName +'\'', msg:'Room #'+roomId});
		});
	};

	$scope.moveToRoom = function (roomId){
		$state.go('room', { id: roomId});
	};

	$scope.addRoom = function(roomName){ 
		var newlyAddedRoom = RoomStorageService.createRoom(roomName);
		
		if(!newlyAddedRoom){
			toasty.error({title: 'Room not Created', msg: 'Maximum limit reached.'});
			return console.log('Room Creation Failed.');
		}
		$scope.rooms = RoomStorageService.getAllRooms();
		$scope.newRoomName = "";
	};

	$scope.addTodoToRoom = function(roomId, todoText){
		var todo = RoomStorageService.addTodo(roomId, todoText.trim());
		if(todo){
			this.newTodo = null;
			console.log($scope.newTodo);
			toasty.info({title: 'Added Todo!', msg:'\'' + todoText.trim() + '\' to Room #'+roomId});
		}
		else{
			console.log('Error adding todo for Room '+roomId+'. Returned:');
			return console.log(todo);
		}
		
		
	};

	$scope.triggerDeleteDialog = function(roomId, roomName){
		$scope.deleteConfirmModal.modal({
			closable: false,
			onApprove: function (){
				deleteRoom(roomId, roomName);
			},
			allowMultiple: false
		});
		$scope.deleteConfirmModal.modal('show');
	};
});