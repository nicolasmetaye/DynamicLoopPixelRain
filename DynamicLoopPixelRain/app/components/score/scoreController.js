﻿angular.module("pixelRainApp.controllers").controller("scoreController", ["$scope", "scoreService",
    function scoreController($scope, scoreService) {
        $scope.score = scoreService.getScore();

        $scope.$on('displayScoreApplyBroadcast', function () {
            $scope.$apply(function () {
                $scope.score = scoreService.getScore();
            });
        });

        $scope.$on('displayScoreBroadcast', function () {
            $scope.score = scoreService.getScore();
        });
    }
]);