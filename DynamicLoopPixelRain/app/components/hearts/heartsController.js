angular.module("pixelRainApp.controllers").controller("heartsController",
    function heartsController($scope, heartsService) {
        $scope.hearts = heartsService.getHearts();

        $scope.$on('displayHeartsApplyBroadcast', function () {
            $scope.$apply(function () {
                $scope.hearts = heartsService.getHearts();
            });
        });

        $scope.$on('displayHeartsBroadcast', function () {
            $scope.hearts = heartsService.getHearts();
        });
    }
);