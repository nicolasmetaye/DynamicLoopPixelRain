angular.module("pixelRainApp.services").factory("blocksService",
    function ($http, gameService) {
        return new BlocksService($http, gameService);
    }
);

function BlocksService($http, gameService) {

    var getBlockWithTrace = function (top, left, letter, speed) {
        var height = 23;
        var separatorDistance = Math.floor(speed * 0.85) + 8;
        return [
            new BlockModel(letter, (top - (separatorDistance * 4)), left, 0.1, false, separatorDistance),
            new BlockModel(letter, (top - (separatorDistance * 3)), left, 0.2, false, separatorDistance),
            new BlockModel(letter, (top - (separatorDistance * 2)), left, 0.4, false, separatorDistance),
            new BlockModel(letter, (top - separatorDistance), left, 0.6, false, separatorDistance),
            new BlockModel(letter, top, left, 1, true, height)
        ];
    };

    this.getUpdatedBlocks = function () {
        var blockStates = gameService.getCurrentBlockStates();
        var blocks = [];
        for (var index = 0; index < blockStates.length; index++) {
            var blockState = blockStates[index];
            blocks = blocks.concat(getBlockWithTrace(blockState.position.top, blockState.position.left, blockState.letter, blockState.speed));
        }
        return blocks;
    };
}