angular.module("pixelRainApp.services").factory("hitsService",
    function (eventsService) {
        return new HitsService(eventsService);
    }
);

function HitsService(eventsService) {
    var hits = 0;
    var hitsKeepAliveTimeout;

    var clearHitsKeepAliveTimeout = function () {
        if (hitsKeepAliveTimeout) {
            window.clearTimeout(clearHitsKeepAliveTimeout);
        }
    };

    this.getHits = function () {
        return hits;
    }

    this.setHits = function (newHits) {
        hits = newHits;
    }

    this.incrementHits = function () {
        clearHitsKeepAliveTimeout();
        hits++;
        hitsKeepAliveTimeout = setTimeout(function () {
            clearHitsKeepAliveTimeout();
            hits = 0;
            eventsService.displayHits();
        }, HitsService.hitsKeepAliveTime);
        eventsService.displayHits();
    }
}

HitsService.hitsKeepAliveTime = 800;