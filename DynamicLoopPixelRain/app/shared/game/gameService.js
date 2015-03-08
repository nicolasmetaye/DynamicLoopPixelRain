angular.module("pixelRainApp.services").factory("gameService",
    function () {
        return new GameService();
    }
);

function GameService() {
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
        var blockState = new BlockStateModel(blockId, getRandomLetter(), -GameService.blockHeight, getRandomNumber(GameService.boardBorderSpace, (GameService.boardWidth - GameService.boardBorderSpace - GameService.blockWidth)), getRandomNumber(1, 10), getRandomColor());
        blockStates.push(blockState);
        var self = this;
        var blockInterval = setInterval(function() {
            self.updateBlock(blockId);
        }, GameService.basicFrameSpeed);
        blockIntervals.push(new BlockInterval(blockId, blockInterval));
    }

    this.updateBlock = function (blockId) {
        var blockStateIndex = getBlockStateIndex(blockId);
        if (blockStateIndex === -1) {
            this.removeBlock(blockId);
            return;
        }
        var blockState = blockStates[blockStateIndex];
        var newTop = blockState.position.top + GameService.minimumSpeedIncrease + (blockState.speed * GameService.speedIncreaseRatio);
        if (newTop >= (GameService.boardHeight - GameService.blockHeight)) {
            this.removeBlock(blockId);
            return;
        }
        blockState.position.top = newTop;
    }

    this.removeAllBlocks = function () {
        blockStates = [];
        for (var index = 0; index < blockIntervals.length; index++) {
            clearInterval(blockIntervals[index].interval);
        }
        blockIntervals = [];
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
}

GameService.minimumSpeedIncrease = 1;
GameService.speedIncreaseRatio = 0.4;
GameService.basicFrameSpeed = 60;
GameService.boardBorderSpace = 10;
GameService.boardWidth = 700;
GameService.boardHeight = 500;
GameService.blockWidth = 24;
GameService.blockHeight = 23;