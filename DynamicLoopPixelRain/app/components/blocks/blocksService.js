angular.module("pixelRainApp.services").factory("blocksService",
    function ($http) {
        return new BlocksService($http);
    }
);

function BlocksService($http) {

    var getBlockWithTrace = function (top, left, letter, speed) {
        var separatorDistance = (speed * 0.7) + 8;
        return [
            new BlockModel(letter, (top - (separatorDistance * 4)), left, 0.1, false, separatorDistance),
            new BlockModel(letter, (top - (separatorDistance * 3)), left, 0.2, false, separatorDistance),
            new BlockModel(letter, (top - (separatorDistance * 2)), left, 0.4, false, separatorDistance),
            new BlockModel(letter, (top - separatorDistance), left, 0.6, false, separatorDistance),
            new BlockModel(letter, top, left, 1, true, 22)
        ];
    };

    this.getUpdatedBlocks = function () {
        var blocks = [];

        blocks = blocks.concat(getBlockWithTrace(60, 20, 'A', 1));
        blocks = blocks.concat(getBlockWithTrace(110, 100, 'B', 3));
        blocks = blocks.concat(getBlockWithTrace(80, 150, 'C', 8));
        blocks = blocks.concat(getBlockWithTrace(150, 170, 'D', 10));
        blocks = blocks.concat(getBlockWithTrace(200, 190, 'E', 6));
        blocks = blocks.concat(getBlockWithTrace(20, 230, 'F', 7));
        blocks = blocks.concat(getBlockWithTrace(220, 250, 'G', 2));
        blocks = blocks.concat(getBlockWithTrace(300, 290, 'H', 8));
        blocks = blocks.concat(getBlockWithTrace(90, 320, 'I', 2));

        return blocks;
    };
}