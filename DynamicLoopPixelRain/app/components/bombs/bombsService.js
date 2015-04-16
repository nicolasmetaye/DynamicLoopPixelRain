angular.module("pixelRainApp.services").factory("bombsService",
    function (eventsService) {
        return new BombsService(eventsService);
    }
);

function BombsService(eventsService) {
    var bombs;
    var fadeExplodedBombInterval;

    var clearFadeExplodedBombInterval = function () {
        if (fadeExplodedBombInterval) {
            window.clearInterval(fadeExplodedBombInterval);
        }
    };

    this.getBombs = function() {
        return bombs;
    };

    this.resetBombs = function() {
        bombs = new BombsModel(3, 0);
    };

    this.removeBomb = function() {
        if (bombs.number <= 0) {
            return;
        }
        clearFadeExplodedBombInterval();
        bombs.number--;
        bombs.explodedBombOpacity = 1;
        fadeExplodedBombInterval = setInterval(function() {
            bombs.explodedBombOpacity -= BombsService.fadeExplodedBombOpacityDecrease;
            eventsService.displayBombs(true);
            if (bombs.explodedBombOpacity <= 0) {
                clearFadeExplodedBombInterval();
            }
        }, BombsService.fadeExplodedBombIntervalSpeed);
        eventsService.displayBombs(true);
    };

    this.resetBombs();
};

BombsService.fadeExplodedBombIntervalSpeed = 70;
BombsService.fadeExplodedBombOpacityDecrease = 0.1;