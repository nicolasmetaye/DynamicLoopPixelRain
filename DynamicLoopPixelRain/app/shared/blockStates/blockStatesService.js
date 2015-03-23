angular.module("pixelRainApp.services").factory("blockStatesService",
    function (levelService) {
        return new BlockStatesService(levelService);
    }
);

function BlockStatesService(levelService) {
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
                   "T", "U", "V", "W", "X", "Y", "Z"];
    var colors = ["blue", "green", "orange", "white", "purple", "red", "yellow"];
    var blockStates = [];
    var blockIntervals = [];
    var maxId = 0;
  
    var getRandomNumber = function (minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    var getRandomLetter = function ()
    {
        return letters[getRandomNumber(0, letters.length - 1)];
    }

    var getRandomColor = function () {
        return colors[getRandomNumber(0, colors.length - 1)];
    }

    var getBlockStateIndex = function(blockId) {
        for (var index = 0; index < blockStates.length; index++) {
            var blockState = blockStates[index];
            if (blockState.blockId === blockId) {
                return index;
            }
        }
        return -1;
    }

    var getBlockIntervalIndex = function (blockId) {
        for (var index = 0; index < blockIntervals.length; index++) {
            var blockInterval = blockIntervals[index];
            if (blockInterval.blockId === blockId) {
                return index;
            }
        }
        return -1;
    }

    this.getCurrentBlockStates = function () {
        return blockStates;
    };

    this.addBlock = function () {
        maxId = maxId + 1;
        var blockId = maxId;
        var speedLevel = Math.floor(levelService.getLevel() * BlockStatesService.levelSpeedRatio);
        var minimumSpeed = BlockStatesService.startMininumSpeed + speedLevel;
        var maximumSpeed = BlockStatesService.startMaximumSpeed + speedLevel;
        var blockState = new BlockStateModel(blockId, getRandomLetter(), -BlockStatesService.blockHeight, getRandomNumber(BlockStatesService.boardBorderSpace, (BlockStatesService.boardWidth - BlockStatesService.boardBorderSpace - BlockStatesService.blockWidth)), getRandomNumber(minimumSpeed, maximumSpeed), getRandomColor());
        blockStates.push(blockState);
        var self = this;
        var blockInterval = setInterval(function() {
            self.updateBlock(blockId);
        }, BlockStatesService.blockIntervalSpeed);
        blockIntervals.push(new BlockInterval(blockId, blockInterval));
        levelService.updateLevel();
    }

    this.updateBlock = function (blockId) {
        var blockStateIndex = getBlockStateIndex(blockId);
        if (blockStateIndex === -1) {
            this.removeBlock(blockId);
            return;
        }
        var blockState = blockStates[blockStateIndex];
        var newTop = blockState.position.top + BlockStatesService.minimumSpeedIncrease + (blockState.speed * BlockStatesService.speedIncreaseRatio);
        if (newTop >= (BlockStatesService.boardHeight - BlockStatesService.blockHeight)) {
            this.removeBlock(blockId);
            return;
        }
        blockState.position.top = newTop;
    }

    this.removeBlock = function (blockId) {
        var blockStateIndex = getBlockStateIndex(blockId);
        if (blockStateIndex > -1) {
            blockStates.splice(blockStateIndex, 1);
        }
        var blockIntervalIndex = getBlockIntervalIndex(blockId);
        if (blockIntervalIndex > -1) {
            var blockInterval = blockIntervals[blockIntervalIndex];
            clearInterval(blockInterval.interval);
            blockIntervals.splice(blockIntervalIndex, 1);
        }
    }

    this.removeAllBlocks = function () {
        blockStates = [];
        for (var index = 0; index < blockIntervals.length; index++) {
            clearInterval(blockIntervals[index].interval);
        }
        blockIntervals = [];
    }
};

BlockStatesService.startMininumSpeed = 1;
BlockStatesService.startMaximumSpeed = 6;
BlockStatesService.levelSpeedRatio = 0.4;
BlockStatesService.minimumSpeedIncrease = 1;
BlockStatesService.speedIncreaseRatio = 0.4;
BlockStatesService.blockIntervalSpeed = 60;
BlockStatesService.boardBorderSpace = 10;
BlockStatesService.boardWidth = 700;
BlockStatesService.boardHeight = 500;
BlockStatesService.blockWidth = 24;
BlockStatesService.blockHeight = 23;