angular.module("pixelRainApp.services").factory("blocksService", ["$http", "gameService",
    function($http, gameService) {
        return new BlocksService($http, gameService);
    }
]);

function BlocksService($http, gameService) {
    var getBlockWithTrace = function (top, left, letter, speed, color) {
        var separatorDistance = Math.floor(speed * BlocksService.speedSeparatorDistanceRatio) + BlocksService.startSpeedSeparatorDistance;
        return [
            new BlockModel(letter, (top - (separatorDistance * 4)), left, 0.1, false, separatorDistance, color),
            new BlockModel(letter, (top - (separatorDistance * 3)), left, 0.2, false, separatorDistance, color),
            new BlockModel(letter, (top - (separatorDistance * 2)), left, 0.4, false, separatorDistance, color),
            new BlockModel(letter, (top - separatorDistance), left, 0.6, false, separatorDistance, color),
            new BlockModel(letter, top, left, 1, true, BlocksService.blockHeight, color)
        ];
    };

    this.getUpdatedBlocks = function () {
        var blockStates = gameService.getCurrentBlockStates();
        var blocks = [];
        for (var index = 0; index < blockStates.length; index++) {
            var blockState = blockStates[index];
            blocks = blocks.concat(getBlockWithTrace(blockState.position.top, blockState.position.left, blockState.letter, blockState.speed, blockState.color));
        }
        return blocks;
    };
};

BlocksService.blockHeight = 23;
BlocksService.speedSeparatorDistanceRatio = 0.85;
BlocksService.startSpeedSeparatorDistance = 8;