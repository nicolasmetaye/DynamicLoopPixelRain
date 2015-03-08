angular.module("pixelRainApp.controllers").controller("mainController",
    function mainController($scope, $interval, eventsService, gameService) {
        var displayFrameInterval;

        $scope.addClick = function () {
            gameService.addBlock();
        };

        $scope.startGameClick = function () {
            if (displayFrameInterval) return;

            displayFrameInterval = setInterval(function () {
                eventsService.displayBlocks();
            }, 60);
        };

        $scope.stopGameClick = function () {
            if (displayFrameInterval) {
                window.clearInterval(displayFrameInterval);
                displayFrameInterval = undefined;
            }
        };

        $scope.$on('$destroy', function () {
            gameService.removeAllBlocks();
            $scope.stopGameClick();
        });
    }
);