angular.module("pixelRainApp.services").factory("scoreService",
    function (eventsService, hitsService) {
        return new ScoreService(eventsService, hitsService);
    }
);

function ScoreService(eventsService, hitsService) {
    var score = 0;

    this.getScore = function () {
        return score;
    }

    this.setScore = function (newScore) {
        score = newScore;
    }

    this.updateScore = function (explodedBlockSpeed) {
        score += (ScoreService.minimumScorePerBlock + (explodedBlockSpeed * ScoreService.blockSpeedScoreRatio)) * hitsService.getHits();
        eventsService.displayScore(true);
    }    
}

ScoreService.minimumScorePerBlock = 100;
ScoreService.blockSpeedScoreRatio = 10;