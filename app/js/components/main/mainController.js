angular.module('octoWaffle')
.controller('MainController', function($scope){
	$scope.rooms = [
		{ id: '001', name: 'fancy', todos:['One','Two','Three','Four']},
		{ id: '002', name: 'shabby', todos:['1ne','222','treh','quatros', 'woah']},
		{ id: '003', name: 'foxy', todos:['Ooh','Dos','Tres']},
		{ id: '004', name: 'fancy', todos:['One','Two','Three']},
		{ id: '005', name: 'shabby', todos:['1ne','222','treh']},
		{ id: '002', name: 'shabby', todos:['1ne','222','treh','quatros', 'woah']},
		{ id: '006', name: 'foxy', todos:['Ooh','Dos','Tres']},
		{ id: '007', name: 'fancy', todos:['One','Two','Three']},
		{ id: '008', name: 'shabby', todos:['1ne','222','treh']},
		{ id: '009', name: 'foxy', todos:['Ooh','Dos','Tres']},
		{ id: '002', name: 'shabby', todos:['1ne','222','treh','quatros', 'woah']},
	];

});