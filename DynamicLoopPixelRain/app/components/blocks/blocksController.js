angular.module("pixelRainApp.controllers").controller("blocksController",
    function blocksController($scope, blocksService) {
        $scope.blocks = [];

        $scope.$on('displayBlocksApplyBroadcast', function () {
            $scope.$apply(function () {
                $scope.blocks = blocksService.getUpdatedBlocks();
            });
        });
    }
);