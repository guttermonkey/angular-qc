angular.module('qcApp', ['ui.bootstrap']);

function QcCtrl($scope) {
	$scope.exams = [
		{name: "X-Ray", weight: 1, xray: true, neuro: false},
		{name: "CT Calcium scoring", weight: 2, xray: false, neuro: true},
		{name: "MRI Routine body", weight: 4, xray: false, neuro: false},
		{name: "CT Head", weight: 2, xray: false, neuro: true}
	];

	$scope.locations = [
		{
			name: "4W",
			countsXray: true,
			takesNeuro: true,
			xrCount: 0,
			bodyCount: 0,
			bodyWeight: 0,
			neuroCount: 0,
			neuroWeight: 0},
		{
			name: "LCN",
			countsXray: true,
			takesNeuro: true,
			xrCount: 0,
			bodyCount: 0,
			bodyWeight: 0,
			neuroCount: 0,
			neuroWeight: 0},
		{
			name: "CLIC",
			countsXray: true,
			takesNeuro: false,
			xrCount: 0,
			bodyCount: 0,
			bodyWeight: 0,
			neuroCount: 0,
			neuroWeight: 0},
		{
			name: "RLC",
			countsXray: false,
			takesNeuro: true,
			xrCount: 0,
			bodyCount: 0,
			bodyWeight: 0,
			neuroCount: 0,
			neuroWeight: 0},
		{
			name: "MIC",
			countsXray: false,
			takesNeuro: false,
			xrCount: 0,
			bodyCount: 0,
			bodyWeight: 0,
			neuroCount: 0,
			neuroWeight: 0}
	];

	$scope.assignments = [];

	$scope.addAssignment = function() {
		$scope.assignments.push({
			time: new Date(),
			location: $scope.place.name,
			exam: $scope.test.name
		});

		if ($scope.test.xray && $scope.place.countsXray) {
			$scope.place.xrCount++;
		}
		if ($scope.test.neuro) {
			$scope.place.neuroCount++;
			$scope.place.neuroWeight += $scope.test.weight;
		} else {
			$scope.place.bodyCount++;
			$scope.place.bodyWeight += $scope.test.weight;
		}

		$scope.test = 0;
		$scope.place = 0;
	};

	$scope.resetCounters = function() {
		angular.forEach($scope.locations, function(location) {
			location.xrCount = 0;
			location.bodyCount = 0;
			location.bodyWeight = 0;
			location.neuroCount = 0;
			location.neuroWeight = 0;
		});
	};

	$scope.filteredLocations = function() {
		var filteredLocations = [];
		if ($scope.test.neuro) {
			angular.forEach($scope.locations, function(location) {
				if (location.takesNeuro)
					this.push(location)
			}, filteredLocations);
		} else {
			filteredLocations = $scope.locations;
		}
		return filteredLocations;
	};
}