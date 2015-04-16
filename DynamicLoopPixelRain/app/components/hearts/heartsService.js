angular.module("pixelRainApp.services").factory("heartsService", ["eventsService",
    function (eventsService) {
        return new HeartsService(eventsService);
    }
]);

function HeartsService(eventsService) {
    var hearts;
    var fadeBrokenHeartInterval;

    var clearFadeBrokenHeartInterval = function () {
        if (fadeBrokenHeartInterval) {
            window.clearInterval(fadeBrokenHeartInterval);
        }
    };

    this.getHearts = function() {
        return hearts;
    };

    this.resetHearts = function() {
        hearts = new HeartsModel(3, 0);
    };

    this.removeHeart = function() {
        clearFadeBrokenHeartInterval();
        hearts.number--;
        hearts.brokenHeartOpacity = 1;
        fadeBrokenHeartInterval = setInterval(function() {
            hearts.brokenHeartOpacity -= HeartsService.fadeBrokenHeartOpacityDecrease;
            eventsService.displayHearts(true);
            if (hearts.brokenHeartOpacity <= 0) {
                clearFadeBrokenHeartInterval();
            }
        }, HeartsService.fadeBrokenHeartIntervalSpeed);
        eventsService.displayHearts(true);
        if (hearts.number === 0) {
            eventsService.stopGame();
        }
    };

    this.resetHearts();
};

HeartsService.fadeBrokenHeartIntervalSpeed = 70;
HeartsService.fadeBrokenHeartOpacityDecrease = 0.1;