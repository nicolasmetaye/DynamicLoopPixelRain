angular.module("pixelRainApp.controllers").controller("mainController",
    function mainController($scope, $document, $interval, eventsService, gameService, levelService, scoreService, heartsService, bombsService, focusService) {
        var displayFrameInterval;
        var addBlockInterval;
        var frameMilliseconds = 100;
        $scope.displayStart = true;
        $scope.displayLevelChoice = false;
        $scope.keyInput = '';

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
            focusService.lockFocusOnKeyInput();
            $scope.displayLevelChoice = false;
            levelService.setLevel(level);
            scoreService.setScore(0);
            heartsService.resetHearts();
            bombsService.resetBombs();
            eventsService.displayLevel(false);
            eventsService.displayScore(false);
            eventsService.displayHearts(false);
            eventsService.displayBombs(false);
            setUpDisplayFrameInterval();
            setUpAddBlockInterval();;
        };

        $scope.stopGameClick = function () {
            focusService.unlockFocusOnKeyInput();
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

        // Only way I found to make it compatible with every mobile browsers as 
        // keyup/keydown/keypress are not responding well all the time
        $document.bind('keyup', function () {
            var keys = $scope.keyInput;
            $scope.keyInput = '';
            for (var index = 0; index < keys.length; index++) {
                gameService.explodeBlocks(keys[index]);
            }
        });
    }
);