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
    $routeProvider.when('/settings', {
      templateUrl: 'html/views/settings.html',
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
        index: players.length,
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
        },
        research: {
          compass: 0, //Zirkel
          plate: 0,   //Steintafel
          gear: 0,    //Zahnrad
          variant: 0,
          spied: {
            compass: false,
            plate: false,
            gear: false,
            count: 0
          },
          aristotle: false
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
        for(var i = 0; i < players.length; i++) {
          players[i].index = i;
        }
      }
    };
  }]);
  wonderApp.service('scoreInput', function() {
    return {
      open: false,
      negative: false,
      category: '',
      categoryIndex: 0,
      player: null,
      backgroundClass: '',
      value: 0
    };
  });

  /** Run **/
  wonderApp.run(['$location', '$timeout', 'players', function($location, $timeout, players) {
    players.add(['Bernhard', 'Mina', 'Simon', 'Daniel', 'Christian']);
  }]);

  /** Controller **/
  wonderApp.controller('wonderCtrl', ['$scope', '$location', '$timeout', '$rootScope', function ($scope, $location, $timeout, $rootScope) {
    //Routing Functions
    $scope.activePath = '';
    $scope.previousPath = [];

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      var newPath = next.substr(next.indexOf('#') !== -1 ? next.indexOf('#') + 1 : next.length);
      var oldPath = current.substr(current.indexOf('#') !== -1 ? current.indexOf('#') + 1 : current.length);

      $scope.activePath = newPath;
      if(newPath === $scope.previousPath[$scope.previousPath.length - 1]) {
        $scope.previousPath.pop();
      } else {
        $scope.previousPath.push(oldPath);
      }

      if($scope.previousPath.length > 6 || $scope.previousPath[$scope.previousPath.length - 1] === '') $scope.previousPath.shift();
    });

    $scope.changeView = function(path) {
      $timeout(function(){
        $location.path(path);
      });
    };
    $scope.previousView = function() {
      $timeout(function(){
        $location.path($scope.previousPath[$scope.previousPath.length - 1]);
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
  wonderApp.controller('playerCtrl', ['$scope', 'players', 'wonders', function($scope, players, wonders) {
    $scope.newPlayerName = '';
    $scope.players = players;
    $scope.wonders = wonders;
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
      scoreInput.value = 0;
    };
    $scope.close = function() {
      if(scoreInput.player !== null) {
        scoreInput.player.score[scoreInput.category] = (scoreInput.negative) ? scoreInput.value * -1 : scoreInput.value;
      }

      scoreInput.negative = false;
      scoreInput.open = false;
      scoreInput.player = null;
      scoreInput.category = '';
    };
    $scope.next = function() {
      if(scoreInput.player.index < players.get().length - 1) {
        $scope.editScore(scoreInput.categoryIndex, players.get()[scoreInput.player.index + 1]);
      } else {
        try {
          $scope.editScore(scoreInput.categoryIndex + 1, players.get()[0]);
        } catch(ex) {}
      }
    };
    $scope.switchSign = function() {
      scoreInput.negative = !scoreInput.negative;
    };
    //Keyboard - Default
    $scope.editScore = function (category, sender) {
      if(scoreInput.player !== null) {
        scoreInput.player.score[scoreInput.category] = (scoreInput.negative) ? scoreInput.value * -1 : scoreInput.value;
      }
      scoreInput.open = true;
      scoreInput.negative = (sender.score[category] < 0);
      scoreInput.backgroundClass = $scope.categories[category].name;
      scoreInput.categoryIndex = category;
      scoreInput.category = $scope.categories[category].name;
      scoreInput.player = sender;
      scoreInput.value = scoreInput.negative ? sender.score[scoreInput.category] * -1 : sender.score[scoreInput.category];

      sender[category] = (scoreInput.negative) ? parseInt(scoreInput.value) * -1 : parseInt(scoreInput.value);
    };
    $scope.editValue = function(value) {
      if (scoreInput.value === 0) {
        scoreInput.value = value.toString();
      } else {
        scoreInput.value += value.toString();
      }
    };
    //Keyboard - Research
    $scope.addSymbol = function(symbolType) {
      try {
        scoreInput.player.research[symbolType]++;
      } catch(ex) {}
      $scope.researchCalc();
    };
    $scope.removeSymbol = function(symbolType) {
      try {
        if(scoreInput.player.research[symbolType] > 0)
          scoreInput.player.research[symbolType]--;
      } catch(ex) {}
      $scope.researchCalc();
    };
    $scope.researchCalc = function() {
      scoreInput.value =
        Math.pow(scoreInput.player.research.compass, 2) +
        Math.pow(scoreInput.player.research.plate, 2) +
        Math.pow(scoreInput.player.research.gear, 2) +
        Math.min(scoreInput.player.research.compass, scoreInput.player.research.plate, scoreInput.player.research.gear) *
        (scoreInput.player.research.aristotle ? 10 : 7)
      ;
    };
    $scope.toggleAristotle = function() {
      scoreInput.player.research.aristotle = !scoreInput.player.research.aristotle;
      $scope.researchCalc();
    }
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
    };
  });
  wonderApp.directive('syncScrolls', function(){
    var scrollLeft = 0;
    function combine(elements){
      elements.on('scroll', function(e){
        if(e.isTrigger){
          e.target.scrollLeft = scrollLeft;
        } else {
          scrollLeft = e.target.scrollLeft;
          elements.each(function (element) {
            if( !this.isSameNode(e.target) ){
              $(this).trigger('scroll');
            }
          });
        }
      });
    }

    return {
      restrict: 'A',
      replace: false,
      compile: function(element, attrs){
        combine(element.find('.'+attrs.syncScrolls));
      }
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
