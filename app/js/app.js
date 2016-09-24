angular.module('octoWaffle', ['ui.router'])
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
				roomId: function($stateParams){
					return $stateParams.id;
				}
			}
		})
});