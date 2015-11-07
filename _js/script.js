/*jshint asi: false, browser: true, eqeqeq: true, eqnull: true, jquery: true, strict: false, laxcomma: true, nonbsp: true, undef: true, unused: true*/
/*global angular*/


//  /** Controllers **/
//  wonderApp.controller('wonderCtrl', ['$scope', function ($scope) {
//    $scope.controls = {
//      open: false,
//      background: '',
//      negative: false,
//      value: '0',
//      player: '',
//      category: ''
//    };
//
//    $scope.editScore = function (category, sender) {
//      $scope.controls.background = category;
//      $scope.controls.value = sender[category].toString();
//      $scope.controls.open = true;
//      $scope.controls.player = sender;
//      $scope.controls.category = category;
//    };
//    $scope.editValue = function (value) {
//      if ($scope.controls.value === '0') {
//        $scope.controls.value = value.toString();
//      } else {
//        $scope.controls.value += value.toString();
//      }
//    };
//    $scope.clearValue = function () {
//      $scope.controls.value = '0';
//    };
//    $scope.closeControls = function () {
//      $scope.controls.player[$scope.controls.category] = (($scope.controls.negative) ? '-' : '') + $scope.controls.value;
//      $scope.controls.negative = false;
//      $scope.controls.open = false;
//    };
//    $scope.calcTotal = function (player) {
//      var total = 0;
//
//      for (var key in player) {
//        total += parseInt(player[key]);
//      }
//
//      return total;
//    };
//    $scope.switchSign = function() {
//      $scope.controls.negative = ($scope.controls.negative) ? false : true;
//    };
//  }]);
//
//  wonderApp.controller('wonderMenuCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
//    //Setup-Function
//
//    //
//    $scope.newGame = function () {
//      $scope.$parent.players = [];
//      $('.table-score tr').each(function () {
//        $('td, th', this).not(':first-child').remove();
//      });
//      $scope.close();
//    };
//  }]);
//
//
//  /** Directives **/
//})();


(function() {
  'use strict';

  var wonderApp = angular.module('wonderApp', ['ngTouch', 'ngRoute']);

  wonderApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/score'});
    $routeProvider.when('/score', {
      templateUrl: 'html/views/score.html',
      controller: '' //TODO Add Controller
    });
    $routeProvider.when('/players', {
      templateUrl: 'html/views/players.html',
      controller: '' //TODO Add Controller
    });
    $routeProvider.when('/statistics', {
      templateUrl: 'html/views/statistics.html',
      controller: '' //TODO Add Controller
    });
  }]);

  wonderApp.controller('wonderCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.activePath = '/score';
    $scope.previousPath = ['/score'];
    $scope.players = {
      Bernhard: {
        military: 0,
        money: 1,
        wonder: 2,
        buildings: 3,
        trading: 4,
        research: 5,
        guild: 6,
        city: 7,
        leader: 8,
      },
      Mina: {
        military: 0,
        money: 0,
        wonder: 0,
        buildings: 0,
        trading: 0,
        research: 0,
        guild: 0,
        city: 0,
        leader: 0,
      },
      Simon: {
        military: 0,
        money: 0,
        wonder: 0,
        buildings: 0,
        trading: 0,
        research: 0,
        guild: 0,
        city: 0,
        leader: 0,
      },
      Christian: {
        military: 0,
        money: 0,
        wonder: 0,
        buildings: 0,
        trading: 0,
        research: 0,
        guild: 0,
        city: 0,
        leader: 0,
      },
      Daniel: {
        military: 0,
        money: 0,
        wonder: 0,
        buildings: 0,
        trading: 0,
        research: 0,
        guild: 0,
        city: 0,
        leader: 0,
      },
      Michael: {
        military: 0,
        money: 0,
        wonder: 0,
        buildings: 0,
        trading: 0,
        research: 0,
        guild: 0,
        city: 0,
        leader: 0,
      }
    };
    $scope.categories = [
      {
        name: 'military',
        icon: 'ion-wand'
      },
      {
        name: 'money',
        icon: 'ion-social-usd'
      },
      {
        name: 'wonder',
        icon: 'ion-eject'
      },
      {
        name: 'buildings',
        icon: 'ion-home'
      },
      {
        name: 'trading',
        icon: 'ion-arrow-swap'
      },
      {
        name: 'research',
        icon: 'ion-ios-flask'
      },
      {
        name: 'guild',
        icon: 'ion-social-buffer'
      },
      {
        name: 'city',
        icon: 'ion-eye-disabled'
      },
      {
        name: 'leader',
        icon: 'ion-person'
      }
    ];

    $scope.changeView = function(path) {
      $scope.previousPath.push($scope.activePath);
      $scope.activePath = path;

      $location.path($scope.activePath);
    };
    $scope.previousView = function() {
      $scope.activePath = $scope.previousPath.pop();
      $location.path($scope.activePath);
    };

    $scope.deletePlayer = function(player) {
      delete $scope.players[player];
    };
    $scope.addPlayer = function() {
//      $scope.players[TODO] = {
//        military: 0,
//        money: 0,
//        wonder: 0,
//        buildings: 0,
//        trading: 0,
//        research: 0,
//        guild: 0,
//        city: 0,
//        leader: 0,
//      };
    };

    (function() { $location.path($scope.activePath); })();
  }]);
})();
