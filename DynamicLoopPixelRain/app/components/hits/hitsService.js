angular.module("pixelRainApp.services").factory("hitsService",
    function (eventsService) {
        return new HitsService(eventsService);
    }
);

function HitsService(eventsService) {
    var hits;
    var hitsKeepAliveTimeout;
    var hitsStartFadingTimeout;
    var fadeHitsInterval;

    var clearHitsKeepAliveTimeout = function () {
        if (hitsKeepAliveTimeout) {
            window.clearTimeout(clearHitsKeepAliveTimeout);
        }
    };

    var clearHitsStartFadingTimeout = function () {
        if (hitsStartFadingTimeout) {
            window.clearTimeout(hitsStartFadingTimeout);
        }
    };

    var clearFadeHitsInterval = function () {
        if (fadeHitsInterval) {
            window.clearInterval(fadeHitsInterval);
        }
    };

    this.getHits = function () {
        return hits;
    }

    this.resetHits = function () {
        hits = new HitsModel(0, 0, 0, 0, 0 , 0, 1);
    }

    var updateNumberPosition = function (blockState)
    {
        hits.numberPosition.top = blockState.position.top - HitsService.hitsNumberContainerTopOffset;
        if (hits.numberPosition.top < HitsService.hitsNumberTopMinimum) {
            hits.numberPosition.top = HitsService.hitsNumberTopMinimum;
        }
        hits.numberPosition.left = blockState.position.left - HitsService.hitsNumberContainerLeftOffset;
        if (hits.numberPosition.left < HitsService.hitsNumberLeftMinimum) {
            hits.numberPosition.left = HitsService.hitsNumberLeftMinimum;
        }
        if (hits.numberPosition.left > HitsService.hitsNumberLeftMaximum) {
            hits.numberPosition.left = HitsService.hitsNumberLeftMaximum;
        }
    }
    var updateScorePosition = function () {
        hits.scorePosition.top = hits.numberPosition.top + HitsService.hitsScoreContainerTopOffset;
        hits.scorePosition.left = hits.numberPosition.left;
    }

    this.updateHits = function (blockState, number, score) {
        clearHitsKeepAliveTimeout();
        clearHitsStartFadingTimeout();
        clearFadeHitsInterval();
        hits.number = number;
        hits.score = score;
        updateNumberPosition(blockState);
        updateScorePosition();
        hits.opacity = 1;
        var self = this;
        hitsKeepAliveTimeout = setTimeout(function () {
            clearHitsKeepAliveTimeout();
            clearHitsStartFadingTimeout();
            clearFadeHitsInterval();
            self.resetHits();
            eventsService.displayHits();
        }, HitsService.hitsKeepAliveTime);
        hitsStartFadingTimeout = setTimeout(function () {
            fadeHitsInterval = setInterval(function () {
                hits.opacity -= HitsService.fadeHitsOpacityDecrease;
                eventsService.displayHits();
                if (hits.opacity <= 0) {
                    clearFadeHitsInterval();
                }
            }, HitsService.fadeHitsIntervalSpeed);
        }, HitsService.hitsStartFadingTime);
        
        eventsService.displayHits();
    }

    this.resetHits();
};

HitsService.hitsKeepAliveTime = 1000;
HitsService.hitsStartFadingTime = 700;
HitsService.fadeHitsIntervalSpeed = 50;
HitsService.fadeHitsOpacityDecrease = 0.15;
HitsService.hitsNumberContainerTopOffset = 25;
HitsService.hitsNumberContainerLeftOffset = 5;
HitsService.hitsNumberTopMinimum = 0;
HitsService.hitsNumberLeftMinimum = 0;
HitsService.hitsNumberLeftMaximum = 616;
HitsService.hitsScoreContainerTopOffset = 10;