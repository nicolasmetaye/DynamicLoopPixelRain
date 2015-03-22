angular.module("pixelRainApp.services").factory("levelService",
    function (eventsService) {
        return new LevelService(eventsService);
    }
);

function LevelService(eventsService) {
    var level = 1;
    var blocksCreated = 0;

    this.getLevel = function () {
        return level;
    }

    this.setLevel = function (newLevel) {
        level = newLevel;
        blocksCreated = 0;
    }

    this.updateLevel = function() {
        blocksCreated++;
        if (level < 10 && blocksCreated === LevelService.minimumblocksPerLevel + (level * LevelService.blockIncreasePerLevel)) {
            level++;
            blocksCreated = 0;
            eventsService.displayLevel(true);
        }
    }    
}

LevelService.blockIncreasePerLevel = 5;
LevelService.maximumLevel = 10;
LevelService.minimumblocksPerLevel = 20;