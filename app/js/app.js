angular.module('octoWaffle', ['ui.router', 'angular-storage'])
.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'js/components/main/main.html',
			controller: 'MainController'
		})
		.state('room', {
			url: '/room/:id',
			templateUrl: 'js/components/room/room.html',
			controller: 'RoomController',
			resolve: {
				roomDetails: function($stateParams, RoomStorageService){
					return RoomStorageService.getRoomById($stateParams.id);
				}
			}
		})
	
})
.service('RoomStorageService', function(store){
	const MAX_ROOMS = 10;
	const MAX_TODOS_PER_ROOM = 10;
	const rootStore = store.getNamespacedStore('octoWaffle');
	var roomKeys = rootStore.get('roomKeys') || [];

	if(!roomKeys.length){
		rootStore.set('roomKeys', roomKeys);
	}

	var getNewKey = function(){
		roomKeys = rootStore.get('roomKeys');
		var possible = Math.ceil(Math.random() * MAX_ROOMS);
		if(roomKeys.length >= MAX_ROOMS){
			return -1;
		}
		while(_.findWhere(roomKeys, { id: possible })){
			possible = Math.ceil(Math.random() * MAX_ROOMS);
		}
		return possible;
	};

	var getNewTodoKeyForRoom = function(roomStore){
		todos = roomStore.get('todos');
		var possible = Math.ceil(Math.random() * MAX_TODOS_PER_ROOM);
		if(todos.length >= MAX_TODOS_PER_ROOM){
			return -1;
		}
		while(_.findWhere(todos, { id: possible })){
			possible = Math.ceil(Math.random() * MAX_TODOS_PER_ROOM);
		}
		return possible;
	};

	var getRoomNamespacedStore = function(id){
		var namespace = 'octoWaffle.room.'+id;
		return store.getNamespacedStore(namespace);	
	};

	this.createRoom = function (name){
		var roomKey = getNewKey();
		var room = {};
		if( roomKey === -1 ){
			console.log('Ran out of keys! ' + MAX_ROOMS + ' is a huge limit.');
			return null;
		}

		room.id = roomKey;
		room.name = name;
		roomKeys.push(room);
		rootStore.set('roomKeys', roomKeys);
		return room;
	};

	this.getAllRooms = function(){
		var rooms = rootStore.get('roomKeys') || [];
		if(!rooms.length){
			rootStore.set('roomKeys', rooms);
		}
		return rooms;
	};

	this.deleteRoom = function(roomId) {
		var roomKeys = this.getAllRooms();
		var roomStore = getRoomNamespacedStore(roomId);
		var withDeletedRoom = _.reject(roomKeys, function(room){
			return (parseInt(room.id) == parseInt(roomId))
		});
		rootStore.set('roomKeys',withDeletedRoom);
		roomStore.remove('todos');
		return true;
	};

	this.getRoomById = function(id){
		var keys = rootStore.get('roomKeys');
		var room = _.findWhere(keys, { id: parseInt(id) });
		return room || null;
	};

	this.addTodo = function(id, description){
		var roomStore = getRoomNamespacedStore(id); 
		var roomTodos = this.getAllTodosForId(parseInt(id));

		var todoKey = getNewTodoKeyForRoom(roomStore);
		var newTodo = {
			id: todoKey,
			text: description,
			complete: false,
			createdAt: new Date(),
			completedAt: null
		};

		roomTodos.push(newTodo);
		roomTodos.sort(function(first, second){
			first = new Date(first.createdAt);
			second = new Date(second.createdAt);
			return (first.getTime() - second.getTime());
		});
		roomStore.set('todos', roomTodos);
		return roomTodos;
	};

	this.getAllTodosForId = function(id){
		var roomStore = getRoomNamespacedStore(id);
		var roomTodos = roomStore.get('todos') || [];
		if(!roomTodos.length){
			roomStore.set('todos', roomTodos);
		}
		return roomTodos;
	};

	this.toggleTodo = function(roomId, todoId, todoState){
		var roomStore = getRoomNamespacedStore(roomId); 
		var roomTodos = this.getAllTodosForId(parseInt(roomId));
		var roomTodos = _.map(roomTodos, function(todo){
			if(todo.id === todoId){
				todo.complete = todoState;
				todo.completedAt = (todoState == true)? new Date() : null; 
			}
			return todo;
		});
		roomStore.set('todos', roomTodos);
	};

	this.deleteTodo = function(roomId, todoId){
		var roomStore = getRoomNamespacedStore(roomId); 
		var roomTodos = this.getAllTodosForId(parseInt(roomId));

		var updatedTodos = _.reject(roomTodos, function(todo){
			return parseInt(todo.id) === parseInt(todoId);
		});
		roomStore.set('todos', updatedTodos);
	};

});