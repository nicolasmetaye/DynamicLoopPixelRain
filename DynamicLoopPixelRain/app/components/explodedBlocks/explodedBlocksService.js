angular.module("pixelRainApp.services").factory("explodedBlocksService",
    function ($http, gameService) {
        return new ExplodedBlocksService($http, gameService);
    }
);

function ExplodedBlocksService($http, gameService) {
    this.getUpdatedExplodedBlocks = function () {
        var explodedBlockStates = gameService.getCurrentExplodedBlockStates();
        var explodedBlocks = [];
        for (var index = 0; index < explodedBlockStates.length; index++) {
            var explodedBlockState = explodedBlockStates[index];
            explodedBlocks[explodedBlocks.length] = new ExplodedBlockModel(explodedBlockState.position.top, explodedBlockState.position.left, explodedBlockState.opacity);
        }
        return explodedBlocks;
    };
};