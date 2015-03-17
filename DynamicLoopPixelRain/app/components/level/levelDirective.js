angular.module("pixelRainApp.directives").directive("ngLevel",
    function () {
        return {
            restrict: 'A',
            templateUrl: "/app/components/level/levelView.html"
        }
    }
);