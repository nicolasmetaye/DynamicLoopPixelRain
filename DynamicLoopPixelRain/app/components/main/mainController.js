angular.module("pixelRainApp.controllers").controller("mainController",
    function mainController($scope, eventsService, gameService) {
        $scope.addClick = function () {
            gameService.addBlock();
            eventsService.displayBlocks();
        };
    }
);