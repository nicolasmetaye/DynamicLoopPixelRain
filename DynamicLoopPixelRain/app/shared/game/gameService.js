angular.module("pixelRainApp.services").factory("gameService",
    function (blockStatesService, explodedBlockStatesService, levelService) {
        return new GameService(blockStatesService, explodedBlockStatesService, levelService);
    }
);

function GameService(blockStatesService, explodedBlockStatesService, levelService) {
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
        levelService.setLevel(1);
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
            var explodedBlockState = blocksToExplode[indexToExplode];
            blockStatesService.removeBlock(explodedBlockState.blockId);
            explodedBlockStatesService.addExplodedBlock(explodedBlockState);
        }
    }

    this.getLevel = function () {
        return levelService.getLevel();
    }
}

GameService.blockIntervalSpeedPerLevel = 90;
GameService.blockIntervalSpeedOriginal = 1600;