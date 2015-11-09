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
      controller: 'scoreCtrl'
    });
    $routeProvider.when('/players', {
      templateUrl: 'html/views/players.html',
      controller: 'playerCtrl'
    });
    $routeProvider.when('/statistics', {
      templateUrl: 'html/views/statistics.html',
      controller: '' //TODO Add Controller
    });
  }]);

  /** Controller **/
  wonderApp.controller('wonderCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.activePath = '/score';
    $scope.activeWonders = [];
    $scope.previousPath = ['/score'];

    $scope.wonders = [
      'Abu Simbel',
      'Alexandria',
      'Babylon',
      'Byzanz',
      'Ephesus',
      'Gizeh',
      'Helikanassos',
      'Manneken Pis',
      'Olypmpia',
      'Petra',
      'Rhodos',
      'Rom',
      'Stonehenge',
      'The Great Wall',
    ];
    $scope.randomWonder = function() {
      var index = Math.floor(Math.random()*$scope.wonders.length);
      var wonder = $scope.wonders[index];
      while($scope.activeWonders.indexOf(wonder) > -1) {
        index = Math.floor(Math.random()*$scope.wonders.length);
        wonder = $scope.wonders[index];
      }
      $scope.activeWonders.push(wonder);

      return wonder;
    };

    $scope.players = {
      Bernhard: {
        wonder: $scope.randomWonder(),
        score: {
          military: 0,
          money: 1,
          wonder: 2,
          buildings: 3,
          trading: 4,
          research: 5,
          guild: 6,
          city: 7,
          leader: 8,
        }
      },
      Mina: {
        wonder: $scope.randomWonder(),
        score: {
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
      },
      Simon: {
        wonder: $scope.randomWonder(),
        score: {
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
      },
      Christian: {
        wonder: $scope.randomWonder(),
        score: {
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
      },
      Daniel: {
        wonder: $scope.randomWonder(),
        score: {
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
      },
      Michael: {
        wonder: $scope.randomWonder(),
        score: {
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

      if($scope.previousPath.length > 6) $scope.previousPath.shift();
    };
    $scope.previousView = function() {
      $scope.activePath = $scope.previousPath.pop();
      $location.path($scope.activePath);
    };


    (function() { $location.path($scope.activePath); })();
  }]);
  wonderApp.controller('scoreCtrl', ['$scope', function($scope) {
    $scope.calcTotal = function (player) {
      var total = 0;

      for (var key in player) {
        total += parseInt(player[key]);
      }

      return total;
    };
  }]);
  wonderApp.controller('playerCtrl', ['$scope', function($scope) {
    $scope.newPlayerName = '';

    $scope.deletePlayer = function(player) {
      $scope.$parent.activeWonders.remove(player.wonder);
      delete $scope.$parent.players[player];
    };
    $scope.addPlayer = function() {
      if($scope.newPlayerName !== '') {
        $scope.$parent.players[$scope.newPlayerName] = {
          wonder: $scope.$parent.randomWonder(),
          score: {
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
        $scope.newPlayerName = '';
      }
    };
    $scope.rerollWonder = function(player) {
      var wonder = $scope.$parent.players[player].wonder;
      $scope.$parent.activeWonders.remove(wonder);
      $scope.$parent.players[player].wonder = $scope.$parent.randomWonder();
    };
  }]);
})();


//Helper
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
