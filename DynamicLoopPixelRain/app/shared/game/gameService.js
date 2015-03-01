angular.module("pixelRainApp.services").factory("gameService",
    function () {
        return new GameService();
    }
);

function GameService() {
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
                   "T", "U", "V", "W", "X", "Y", "Z"];
    var blockStates = [];

    var getRandomNumber = function (minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    var getRandomLetter = function ()
    {
        return letters[getRandomNumber(0, letters.length - 1)];
    }

    this.getCurrentBlockStates = function () {
        return blockStates;
    };

    this.addBlock = function () {
        blockStates.push(new BlockStateModel(getRandomLetter(), getRandomNumber(50, 500), getRandomNumber(10, 668), getRandomNumber(1,10)));
    }
}