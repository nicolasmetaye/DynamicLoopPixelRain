angular.module("pixelRainApp.directives").directive("ngHearts",
    function () {
        return {
            restrict: 'A',
            templateUrl: "/app/components/hearts/heartsView.html"
        };
    }
);