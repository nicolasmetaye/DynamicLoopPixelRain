angular.module("pixelRainApp.directives").directive("ngScore",
    function () {
        return {
            restrict: 'A',
            templateUrl: "/app/components/score/scoreView.html"
        }
    }
);