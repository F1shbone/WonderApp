/*jshint asi: false, browser: true, eqeqeq: true, eqnull: true, jquery: true, strict: false, laxcomma: true, nonbsp: true, undef: true, unused: true*/
/*global angular*/

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
    $routeProvider.when('/profile', {
      templateUrl: 'html/views/profile.html',
      controller: '' //TODO Add Controller
    });
  }]);

  /** Controller **/
  wonderApp.controller('wonderCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.activePath = '/score';
    $scope.activeWonders = [];
    $scope.previousPath = ['/score'];

    $scope.extension = 'cities',
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

    $scope.players = [
      {
        name: 'Bernhard',
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
      {
        name: 'Mina',
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
      {
        name: 'Simon',
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
      {
        name: 'Christian',
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
      {
        name: 'Daniel',
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
    ];
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

    $scope.newGameDialogIn = false;
    $scope.newGame = function() {
      $scope.newGameDialogIn = true;
      $scope.players = [];
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
    $scope.keyboard = {
      open: false,
      background: '',
      negative: false,
      value: '0',
      player: '',
      category: '',
      switchSign: function() {
        $scope.keyboard.negative = ($scope.keyboard.negative) ? false : true;
      }
    };

    $scope.editScore = function (category, sender) {
      if($scope.keyboard.player !== '') {
        $scope.keyboard.player[$scope.keyboard.category] = (($scope.keyboard.negative && $scope.keyboard.value !== '0') ? '-' : '') + $scope.keyboard.value;
        $scope.keyboard.negative = false;
      }

      $scope.keyboard.background = category;
      $scope.keyboard.value = sender[category].toString();
      $scope.keyboard.open = true;
      $scope.keyboard.player = sender;
      $scope.keyboard.category = category;
    };
    $scope.editValue = function (value) {
      if ($scope.keyboard.value === '0') {
        $scope.keyboard.value = value.toString();
      } else {
        $scope.keyboard.value += value.toString();
      }
    };
    $scope.clearValue = function () {
      $scope.keyboard.value = '0';
    };
    $scope.closekeyboard = function () {
      $scope.keyboard.player[$scope.keyboard.category] = (($scope.keyboard.negative && $scope.keyboard.value !== '0') ? '-' : '') + $scope.keyboard.value;
      $scope.keyboard.negative = false;
      $scope.keyboard.open = false;
      $scope.keyboard.player = '';
    };
  }]);
  wonderApp.controller('playerCtrl', ['$scope', function($scope) {
    $scope.newPlayerName = '';

    $scope.deletePlayer = function(playerIndex) {
      $scope.$parent.activeWonders.remove($scope.$parent.players[playerIndex].wonder);
      $scope.$parent.players.splice(playerIndex, 1);
    };
    $scope.addPlayer = function() {
      if($scope.newPlayerName !== '') {
        $scope.$parent.players.push({
          name: $scope.newPlayerName,
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
        });
        $scope.newPlayerName = '';
      }
    };
    $scope.rerollWonder = function(playerIndex) {
      var wonder = $scope.$parent.players[playerIndex].wonder;
      $scope.$parent.players[playerIndex].wonder = $scope.$parent.randomWonder();
      $scope.$parent.activeWonders.remove(wonder);
    };
    $scope.shufflePlayers = function() {
      $scope.$parent.players.shuffle();
    };
  }]);

  /** Directives **/
  wonderApp.directive("alertNewGame", function() {
    return {
      restrict: 'E',
      scope: {
        open: '=',
        extension: '='
      },
      templateUrl: 'html/templates/alert-new-game.html',
      controller: 'wonderCtrl',
    };
  });
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
Array.prototype.shuffle = function() {
  for (var n = 0; n < this.length - 1; n++) {
    var k = n + Math.floor(Math.random() * (this.length - n));

    var temp = this[k];
    this[k] = this[n];
    this[n] = temp;
  }
};
