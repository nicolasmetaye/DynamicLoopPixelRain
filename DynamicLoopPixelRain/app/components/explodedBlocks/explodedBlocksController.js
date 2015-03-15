angular.module("pixelRainApp.controllers").controller("explodedBlocksController",
    function explodedBlocksController($scope, explodedBlocksService) {
        $scope.explodedBlocks = [];

        $scope.$on('displayExplodedBlocksBroadcast', function () {
            $scope.$apply(function () {
                $scope.explodedBlocks = explodedBlocksService.getUpdatedExplodedBlocks();
            });
        });
    }
);