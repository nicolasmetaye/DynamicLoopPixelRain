angular.module("pixelRainApp.controllers").controller("mainController",
    function mainController($scope, $document, $interval, eventsService, gameService) {
        var displayFrameInterval;
        var addBlockInterval;

        $scope.startGameClick = function () {
            if (displayFrameInterval) return;

            displayFrameInterval = setInterval(function () {
                eventsService.displayBlocks();
            }, 60);

            addBlockInterval = setInterval(function () {
                gameService.addBlock();
            }, 400);
        };

        $scope.stopGameClick = function () {
            if (displayFrameInterval) {
                window.clearInterval(displayFrameInterval);
                displayFrameInterval = undefined;
            }
            if (addBlockInterval) {
                window.clearInterval(addBlockInterval);
                addBlockInterval = undefined;
            }
            gameService.removeAllBlocks();
        };

        $scope.$on('$destroy', function () {
            $scope.stopGameClick();
            gameService.removeAllBlocks();
        });

        $document.bind('keypress', function (e) {
            gameService.removeBlocks(String.fromCharCode(e.which));
        });
    }
);