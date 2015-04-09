angular.module("pixelRainApp.directives").directive("ngBombs",
    function () {
        return {
            restrict: 'A',
            templateUrl: "/app/components/bombs/bombsView.html"
        }
    }
);