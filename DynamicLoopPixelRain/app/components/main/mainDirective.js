angular.module("pixelRainApp.directives").directive("ngMain",
    function () {
        return {
            restrict: 'A',
            templateUrl: "/app/components/main/mainView.html"
        };
    }
);