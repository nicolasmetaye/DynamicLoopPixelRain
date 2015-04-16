angular.module("pixelRainApp.services").factory("scoreService", ["eventsService", "hitsService",
    function (eventsService, hitsService) {
        return new ScoreService(eventsService, hitsService);
    }
]);

function ScoreService(eventsService, hitsService) {
    var score = 0;

    this.getScore = function() {
        return score;
    };

    this.setScore = function(newScore) {
        score = newScore;
    };

    this.updateScore = function(blockState) {
        var hits = hitsService.getHits();
        var hitsNumber = (hits.number + 1);
        var blockScore = (ScoreService.minimumScorePerBlock + (blockState.speed * ScoreService.blockSpeedScoreRatio)) * hitsNumber;
        hitsService.updateHits(blockState, hitsNumber, hits.score + blockScore);
        score += blockScore;
        eventsService.displayScore(true);
    };
};

ScoreService.minimumScorePerBlock = 100;
ScoreService.blockSpeedScoreRatio = 10;