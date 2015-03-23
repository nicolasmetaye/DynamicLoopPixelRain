angular.module("pixelRainApp.services").factory("eventsService",
    function ($rootScope) {
        return new EventsService($rootScope);
    }
);

function EventsService($rootScope) {
    this.displayBlocks = function () {
        $rootScope.$broadcast('displayBlocksApplyBroadcast');
    };

    this.displayLevel = function (apply) {
        if (apply) {
            $rootScope.$broadcast('displayLevelApplyBroadcast');
        } else {
            $rootScope.$broadcast('displayLevelBroadcast');
        }
    };

    this.displayScore = function (apply) {
        if (apply) {
            $rootScope.$broadcast('displayScoreApplyBroadcast');
        } else {
            $rootScope.$broadcast('displayScoreBroadcast');
        }
    };

    this.displayHits = function () {
        $rootScope.$broadcast('displayHitsApplyBroadcast');
    };
};