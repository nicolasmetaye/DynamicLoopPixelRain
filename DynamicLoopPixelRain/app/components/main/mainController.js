angular.module("pixelRainApp.controllers").controller("mainController",
    function mainController($scope, eventsService) {
        $scope.startClick = function () {
            eventsService.displayBlocks();
        };
    }
);