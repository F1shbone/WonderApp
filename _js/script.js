/*jshint asi: false, browser: true, eqeqeq: true, eqnull: true, jquery: true, strict: false, laxcomma: true, nonbsp: true, undef: true, unused: true*/
/*global angular*/

(function() {
  'use strict';

  var wonderApp = angular.module('wonderApp', ['ngTouch', 'ngRoute']);

  wonderApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/players'});
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

  /** Services **/
  wonderApp.service('wonders', function() {
    var basic = [
        'Alexandria',
        'Babylon',
        'Ephesus',
        'Gizeh',
        'Helokanassos',
        'Mannekin Pis',
        'Olympia',
        'Rhodos',
        'Stonehenge'
      ];
    var leaders = [
        'Abu Simbel',
        'Alexandria',
        'Babylon',
        'Ephesus',
        'Gizeh',
        'Helokanassos',
        'Mannekin Pis',
        'Olympia',
        'Rhodos',
        'Rom',
        'Stonehenge'
      ];
    var cities = [
        'Abu Simbel',
        'Alexandria',
        'Babylon',
        'Byzanz',
        'Ephesus',
        'Gizeh',
        'Helokanassos',
        'Mannekin Pis',
        'Olympia',
        'Petra',
        'Rhodos',
        'Rom',
        'Stonehenge',
        'The Great Wall'
      ];
    var active = [];
    return {
      basic: basic,
      leaders: leaders,
      cities: cities,
      active: active,
      random: function($mode, $player) {
        var wonders;
        if($mode === 'basic') wonders = basic;
        if($mode === 'leaders') wonders = leaders;
        if($mode === 'cities') wonders = cities;
        var wonder = wonders[Math.floor(Math.random()*wonders.length)];
        while(active.indexOf(wonder) > -1) {
          wonder = wonders[Math.floor(Math.random()*wonders.length)];
        }
        active.push(wonder);

        if($player !== undefined) {
          active.remove($player.wonder);
          $player.wonder = wonder;
        }
        else {
          return wonder;
        }
      }
    };
  });
  wonderApp.service('players', ['wonders', function(wonders) {
    var players = [];
    var addName = function(name) {
      players.push({
        name: name,
        wonder: wonders.random('cities'),
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
    };
    var addNames = function(names) {
      for (var i = 0; i < names.length; ++i) {
        addName(names[i]);
      }
    };

    return {
      get: function() {
        return players;
      },
      add: function(names) {
        if(typeof names === 'string') {
          addName(names);
        } else {
          addNames(names);
        }
      },
      remove: function(index) {
        wonders.active.remove(players[index].wonder);
        players.splice(index, 1);
      },
      shuffle: function() {
        players.shuffle();
      }
    };
  }]);
  wonderApp.service('scoreInput', function() {
    return {
      open: false,
      negative: false,
      category: '',
      player: '',
      backgroundClass: '',
      value: '0'
    };
  });

  /** Run **/
  wonderApp.run(['$location', '$timeout', 'players', function($location, $timeout, players) {
    $timeout(function(){
      $location.path('players');
    });
    players.add(['Bernhard', 'Mina', 'Simon', 'Daniel', 'Christian']);

  }]);

  /** Controller **/
  wonderApp.controller('wonderCtrl', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    //Routing Functions
    $scope.activePath = '/players';
    $scope.previousPath = ['/players'];
    $scope.changeView = function(path) {
      $scope.previousPath.push($scope.activePath);
      $scope.activePath = path;

      $timeout(function(){
        $location.path($scope.activePath);
      });

      if($scope.previousPath.length > 6) $scope.previousPath.shift();
    };
    $scope.previousView = function() {
      $scope.activePath = $scope.previousPath.pop();
      $timeout(function(){
        $location.path($scope.activePath);
      });
    };
    //Header Functions -- TODO - new Game?
    $scope.game = {
      mode: 'cities',
      showDialog: false,
      openDialog: function() {
        $scope.game.showDialog = true;
        //$scope.players = [];
      },
      players: []
    };
    //DEBUG - TODO remove this
    $scope.test = function() {
      console.log('Hallo Test!');
    };
  }]);
  wonderApp.controller('scoreCtrl', ['$scope', 'players', 'scoreInput', function($scope, players, scoreInput) {
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
    $scope.scoreInput = scoreInput;
    $scope.players = players.get();
    $scope.calcTotal = function (player) {
      var total = 0;
      for (var key in player) {
        total += parseInt(player[key]);
      }
      return total;
    };
    //Keyboard
    $scope.clear = function() {
      scoreInput.value = '0';
    };
    $scope.close = function() {
      scoreInput.negative = false;
      scoreInput.open = false;
    };
    $scope.editScore = function (category, sender, senderName) {
      scoreInput.open = true;
      scoreInput.negative = false;
      scoreInput.backgroundClass = category;
      scoreInput.category = category;
      scoreInput.player = senderName;
      scoreInput.value = sender[category];

      sender[category] = parseInt(scoreInput.value);
      if(scoreInput.negative) sender[category] *= -1;
    };
    $scope.editValue = function(value) {
      console.log(scoreInput.value);
      if (scoreInput.value === '0') {
        scoreInput.value = value.toString();
      } else {
        scoreInput.value += value.toString();
      }
    };
    $scope.switchSign = function() {
      scoreInput.negative = !scoreInput.negative;
    };
  }]);
  wonderApp.controller('playerCtrl', ['$scope', 'players', 'wonders', function($scope, players, wonders) {
    $scope.newPlayerName = '';
    $scope.players = players;
    $scope.wonders = wonders;
  }]);

  /** Directive **/
  wonderApp.directive('alertNewGame', function() {
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
