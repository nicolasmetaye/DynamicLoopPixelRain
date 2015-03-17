angular.module("pixelRainApp.controllers").controller("levelController",
    function levelController($scope, gameService) {
        $scope.levelNumber = 0;

        $scope.$on('displayLevelBroadcast', function () {
            $scope.$apply(function () {
                $scope.levelNumber = gameService.getLevel();
            });
        });

        $scope.$on('updateLevelBroadcast', function () {
            $scope.levelNumber = gameService.getLevel();
        });
    }
);