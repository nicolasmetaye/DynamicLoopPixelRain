angular.module("pixelRainApp.services").factory("eventsService",
    function ($rootScope) {
        return new EventsService($rootScope);
    }
);

function EventsService($rootScope) {
    this.displayBlocks = function () {
        $rootScope.$broadcast('displayBlocksBroadcast');
    };

    this.displayExplodedBlocks = function () {
        $rootScope.$broadcast('displayExplodedBlocksBroadcast');
    };

    this.displayLevel = function () {
        $rootScope.$broadcast('displayLevelBroadcast');
    };

    this.updateLevel = function () {
        $rootScope.$broadcast('updateLevelBroadcast');
    };
}