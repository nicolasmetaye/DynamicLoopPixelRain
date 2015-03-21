angular.module("pixelRainApp.controllers").controller("mainController",
    function mainController($scope, $document, $interval, eventsService, gameService, levelService, scoreService) {
        var displayFrameInterval;
        var addBlockInterval;
        var frameMilliseconds = 100;
        $scope.displayStart = true;

        var setUpAddBlockInterval = function () {
            if (addBlockInterval) {
                window.clearInterval(addBlockInterval);
            }
            addBlockInterval = setInterval(function () {
                var oldLevel = levelService.getLevel();
                gameService.addBlock();
                var newLevel = levelService.getLevel();
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
            levelService.setLevel(1);
            scoreService.setScore(0);
            eventsService.displayLevel(false);
            eventsService.displayScore(false);
            setUpDisplayFrameInterval();
            setUpAddBlockInterval();
            $scope.displayStart = false;
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
            gameService.clear();
            $scope.displayStart = true;
        };

        $scope.$on('$destroy', function () {
            $scope.stopGameClick();
            gameService.clear();
        });

        $document.bind('keypress', function (e) {
            gameService.explodeBlocks(String.fromCharCode(e.which));
        });
    }
);