angular.module("pixelRainApp.controllers").controller("blocksController",
    function blocksController($scope, blocksService) {
        $scope.blocks = [];

        $scope.$on('displayBlocksBroadcast', function () {
            $scope.blocks = blocksService.getUpdatedBlocks();
        });
    }
);