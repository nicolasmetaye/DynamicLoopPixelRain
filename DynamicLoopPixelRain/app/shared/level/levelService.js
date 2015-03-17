angular.module("pixelRainApp.services").factory("levelService",
    function (eventsService) {
        return new LevelService(eventsService);
    }
);

function LevelService(eventsService) {
    var level = 1;

    this.getLevel = function () {
        return level;
    }

    this.setLevel = function (newLevel) {
        level = newLevel;
    }

    this.updateLevel = function(blocksCreated)
    {
        if (level < 10 && blocksCreated % LevelService.blocksPerLevel === 0) {
            level++;
            eventsService.displayLevel();
        }
    }    
}

LevelService.maximumLevel = 10;
LevelService.blocksPerLevel = 15;