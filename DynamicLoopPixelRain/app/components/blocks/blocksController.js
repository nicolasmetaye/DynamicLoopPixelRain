angular.module("pixelRainApp.controllers").controller("blocksController", ["$scope", "blocksService",
    function blocksController($scope, blocksService) {
        $scope.blocks = [];

        $scope.$on("displayBlocksApplyBroadcast", function() {
            $scope.$apply(function() {
                $scope.blocks = blocksService.getUpdatedBlocks();
            });
        });
    }
]);