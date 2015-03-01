angular.module("pixelRainApp.services").factory("eventsService",
    function ($rootScope) {
        return new EventsService($rootScope);
    }
);

function EventsService($rootScope) {
    this.displayBlocks = function () {
        $rootScope.$broadcast('displayBlocksBroadcast');
    };
}