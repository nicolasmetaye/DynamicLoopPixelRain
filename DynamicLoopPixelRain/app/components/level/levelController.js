angular.module("pixelRainApp.controllers").controller("levelController", ["$scope", "levelService",
    function levelController($scope, levelService) {
        $scope.levelNumber = levelService.getLevel();

        $scope.$on('displayLevelApplyBroadcast', function () {
            $scope.$apply(function () {
                $scope.levelNumber = levelService.getLevel();
            });
        });

        $scope.$on('displayLevelBroadcast', function () {
            $scope.levelNumber = levelService.getLevel();
        });
    }
]);