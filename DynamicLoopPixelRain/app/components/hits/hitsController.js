﻿angular.module("pixelRainApp.controllers").controller("hitsController", ["$scope", "hitsService",
    function hitsController($scope, hitsService) {
        $scope.hits = hitsService.getHits();

        $scope.$on('displayHitsApplyBroadcast', function () {
            $scope.$apply(function () {
                $scope.hits = hitsService.getHits();
            });
        });
    }
]);