angular.module("pixelRainApp.controllers").controller("mainController",
    function mainController($scope, $document, $interval, eventsService, gameService) {
        var displayFrameInterval;
        var addBlockInterval;
        var frameMilliseconds = 60;

        var setUpAddBlockInterval = function () {
            if (addBlockInterval) {
                window.clearInterval(addBlockInterval);
            }
            addBlockInterval = setInterval(function () {
                var oldLevel = gameService.getLevel();
                gameService.addBlock();
                var newLevel = gameService.getLevel();
                if (oldLevel !== newLevel) {
                    setUpAddBlockInterval();
                }
            }, gameService.getBlockIntervalSpeed());
        };

        var setUpDisplayFrameInterval = function () {
            if (displayFrameInterval)
                return;
            displayFrameInterval = setInterval(function () {
                eventsService.displayBlocks();
            }, frameMilliseconds);
        };

        $scope.startGameClick = function () {
            setUpDisplayFrameInterval();
            setUpAddBlockInterval();
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