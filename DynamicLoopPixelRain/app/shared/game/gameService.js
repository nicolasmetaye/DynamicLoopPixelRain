angular.module("pixelRainApp.services").factory("gameService",
    function (blockStatesService, explodedBlockStatesService, levelService, scoreService) {
        return new GameService(blockStatesService, explodedBlockStatesService, levelService, scoreService);
    }
);

function GameService(blockStatesService, explodedBlockStatesService, levelService, scoreService) {
    this.getCurrentBlockStates = function () {
        return blockStatesService.getCurrentBlockStates();
    };

    this.getCurrentExplodedBlockStates = function () {
        return explodedBlockStatesService.getCurrentExplodedBlockStates();
    };

    this.addBlock = function () {
        blockStatesService.addBlock();
    }

    this.clear = function () {
        blockStatesService.removeAllBlocks();
        explodedBlockStatesService.removeAllExplodedBlocks();
    }

    this.getBlockIntervalSpeed = function () {
        return GameService.blockIntervalSpeedOriginal - (levelService.getLevel() * GameService.blockIntervalSpeedPerLevel);
    }

    this.explodeBlocks = function (blockLetter) {
        var blockStates = blockStatesService.getCurrentBlockStates();
        var blocksToExplode = [];
        for (var index = 0; index < blockStates.length; index++) {
            var blockState = blockStates[index];
            if (blockState.letter.toUpperCase() === blockLetter.toUpperCase()) {
                blocksToExplode[blocksToExplode.length] = blockState;
            }
        }
        for (var indexToExplode = 0; indexToExplode < blocksToExplode.length; indexToExplode++) {
            var blockToExplodeState = blocksToExplode[indexToExplode];
            scoreService.updateScore(blockToExplodeState);
            blockStatesService.removeBlock(blockToExplodeState.blockId);
            explodedBlockStatesService.addExplodedBlock(blockToExplodeState);
        }
    }
}

GameService.blockIntervalSpeedPerLevel = 90;
GameService.blockIntervalSpeedOriginal = 1600;