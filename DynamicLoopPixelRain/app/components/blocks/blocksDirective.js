angular.module("pixelRainApp.directives").directive("ngBlocks",
    function () {
        return {
            restrict: 'A',
            templateUrl: "/app/components/blocks/blocksView.html"
        }
    }
);