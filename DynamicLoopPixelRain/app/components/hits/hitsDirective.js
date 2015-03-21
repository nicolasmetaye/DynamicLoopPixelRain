angular.module("pixelRainApp.directives").directive("ngHits",
    function () {
        return {
            restrict: 'A',
            templateUrl: "/app/components/hits/hitsView.html"
        }
    }
);