﻿angular.module("pixelRainApp.controllers").controller("bombsController", ["$scope", "bombsService",
    function bombsController($scope, bombsService) {
        $scope.bombs = bombsService.getBombs();

        $scope.$on('displayBombsApplyBroadcast', function () {
            $scope.$apply(function () {
                $scope.bombs = bombsService.getBombs();
            });
        });

        $scope.$on('displayBombsBroadcast', function () {
            $scope.bombs = bombsService.getBombs();
        });
    }
]);