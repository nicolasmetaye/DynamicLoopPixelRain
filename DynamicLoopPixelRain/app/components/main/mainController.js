angular.module("pixelRainApp.controllers").controller("mainController",
    function mainController($scope, $document, $interval, eventsService, gameService, levelService, scoreService, heartsService) {
        var displayFrameInterval;
        var addBlockInterval;
        var frameMilliseconds = 100;
        $scope.displayStart = true;
        $scope.displayLevelChoice = false;

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
            $scope.displayStart = false;
            $scope.displayLevelChoice = true;
        };

        $scope.startGameLevelClick = function (level) {
            $scope.displayLevelChoice = false;
            levelService.setLevel(level);
            scoreService.setScore(0);
            heartsService.resetHearts();
            eventsService.displayLevel(false);
            eventsService.displayScore(false);
            setUpDisplayFrameInterval();
            setUpAddBlockInterval();;
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
            $scope.displayLevelChoice = false;
        };

        $scope.$on('stopGameApplyBroadcast', function () {
            $scope.$apply(function () {
                $scope.stopGameClick();
            });
        });

        $scope.$on('$destroy', function () {
            $scope.stopGameClick();
            gameService.clear();
        });

        $document.bind('keypress', function (e) {
            gameService.explodeBlocks(String.fromCharCode(e.which));
        });
    }
);