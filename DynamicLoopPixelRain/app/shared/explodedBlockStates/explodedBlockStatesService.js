angular.module("pixelRainApp.services").factory("explodedBlockStatesService",
    function () {
        return new ExplodedBlockStatesService();
    }
);

function ExplodedBlockStatesService() {
    var explodedBlockStates = [];
    var explodedBlockIntervals = [];

    var getExplodedBlockStateIndex = function(blockId) {
        for (var index = 0; index < explodedBlockStates.length; index++) {
            var explodedBlockState = explodedBlockStates[index];
            if (explodedBlockState.blockId === blockId) {
                return index;
            }
        }
        return -1;
    };

    var getExplodedBlockIntervalIndex = function(blockId) {
        for (var index = 0; index < explodedBlockIntervals.length; index++) {
            var explodedBlockInterval = explodedBlockIntervals[index];
            if (explodedBlockInterval.blockId === blockId) {
                return index;
            }
        }
        return -1;
    };

    var removeExplodedBlock = function(blockId) {
        var explodedBlockStateIndex = getExplodedBlockStateIndex(blockId);
        if (explodedBlockStateIndex > -1) {
            explodedBlockStates.splice(explodedBlockStateIndex, 1);
        }
        var explodedBlockIntervalIndex = getExplodedBlockIntervalIndex(blockId);
        if (explodedBlockIntervalIndex > -1) {
            var explodedBlockInterval = explodedBlockIntervals[explodedBlockIntervalIndex];
            clearInterval(explodedBlockInterval.interval);
            explodedBlockIntervals.splice(explodedBlockIntervalIndex, 1);
        }
    };

    this.getCurrentExplodedBlockStates = function () {
        return explodedBlockStates;
    };

    this.addExplodedBlock = function(blockState) {
        var explodedBlockState = new ExplodedBlockStateModel(blockState.blockId, blockState.position.top, blockState.position.left, 1);
        explodedBlockStates.push(explodedBlockState);
        var self = this;
        var explodedBlockInterval = setInterval(function() {
            self.updateExplodedBlock(blockState.blockId);
        }, ExplodedBlockStatesService.explodedBlockIntervalSpeed);
        explodedBlockIntervals.push(new BlockInterval(blockState.blockId, explodedBlockInterval));
    };

    this.updateExplodedBlock = function(blockId) {
        var explodedBlockStateIndex = getExplodedBlockStateIndex(blockId);
        if (explodedBlockStateIndex === -1) {
            removeExplodedBlock(blockId);
            return;
        }
        var explodedBlockState = explodedBlockStates[explodedBlockStateIndex];
        var newOpacity = explodedBlockState.opacity - ExplodedBlockStatesService.explodedBlockOpacityDecrease;
        if (newOpacity <= 0) {
            removeExplodedBlock(blockId);
            return;
        }
        explodedBlockState.opacity = newOpacity;
    };

    this.removeAllExplodedBlocks = function() {
        explodedBlockStates = [];
        for (var index = 0; index < explodedBlockIntervals.length; index++) {
            clearInterval(explodedBlockIntervals[index].interval);
        }
        explodedBlockIntervals = [];
    };
};

ExplodedBlockStatesService.explodedBlockOpacityDecrease = 0.25;
ExplodedBlockStatesService.explodedBlockIntervalSpeed = 50;