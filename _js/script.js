/*jshint asi: false, browser: true, eqeqeq: true, eqnull: true, jquery: true, strict: false, laxcomma: true, nonbsp: true, undef: true, unused: true*/
/*global angular, FastClick*/

(function () {
  'use strict';

  var wonderApp = angular.module('wonderApp', []);

  /** Controllers **/
  wonderApp.controller('wonderCtrl', ['$scope', function ($scope) {
    $scope.controls = {
      open: false,
      background: '',
      negative: false,
      value: '0',
      player: '',
      category: ''
    };
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
        icon: 'ion-android-funnel'
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

    $scope.editScore = function (category, sender) {
      $scope.controls.background = category;
      $scope.controls.value = sender[category].toString();
      $scope.controls.open = true;
      $scope.controls.player = sender;
      $scope.controls.category = category;
    };
    $scope.editValue = function (value) {
      if ($scope.controls.value === '0') {
        $scope.controls.value = value.toString();
      } else {
        $scope.controls.value += value.toString();
      }
    };
    $scope.clearValue = function () {
      $scope.controls.value = '0';
    };
    $scope.closeControls = function () {
      $scope.controls.player[$scope.controls.category] = (($scope.controls.negative) ? '-' : '') + $scope.controls.value;
      $scope.controls.negative = false;
      $scope.controls.open = false;
    };
    $scope.calcTotal = function (player) {
      var total = 0;

      for (var key in player) {
        total += parseInt(player[key]);
      }

      return total;
    };
    $scope.switchSign = function() {
      $scope.controls.negative = ($scope.controls.negative) ? false : true;
    };
  }]);

  wonderApp.controller('wonderMenuCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    //Setup-Function
    $timeout(function () {
      for (var item in $scope.menus) {
        var elem = $('#' + $scope.menus[item].drawer);
        $scope.menus[item].height = elem.outerHeight();
        elem.css('max-height', '0px');
      }
      $('#modal-player-add').on('shown.bs.modal', function () {
        $('input', this).focus();
      });
    }, 0, false);

    $scope.$openMenu = $();
    $scope.$openDrawer = $();
    $scope.menus = {
      players: {
        nav: 'nav-players',
        drawer: 'drawer-players',
        height: 0,
        icon: 'ion-person-stalker'
      }
    };


    $scope.open = function (sender) {
      var $sender = $('#' + $scope.menus[sender].nav);

      $scope.$openMenu.removeClass('open');
      $scope.$openDrawer.css('max-height', '0px');
      if (!$scope.$openMenu.is($sender)) {
        //Reset $scope
        $scope.$openMenu = $sender;
        $scope.$openDrawer = $('#' + $scope.menus[sender].drawer);
        //Open
        $scope.$openMenu.addClass('open');
        $scope.$openDrawer.css('max-height', $scope.menus[sender].height + 'px');
      } else {
        $scope.$openMenu = $();
        $scope.$openDrawer = $();
      }
    };
    $scope.close = function () {
      $scope.$openMenu.removeClass('open');
      $scope.$openDrawer.css('max-height', '0px');
      $scope.$openMenu = $();
      $scope.$openDrawer = $();
    };

    $scope.newGame = function () {
      $scope.$parent.players = [];
      $('.table-score tr').each(function () {
        $('td, th', this).not(':first-child').remove();
      });
      $scope.close();
    };

    $scope.addPlayer = function () {
      var playerName = $('#modal-player-add input').val();

      if (playerName !== undefined) {
        $scope.$parent.players[playerName] = {
          military: 0,
          money: 0,
          wonder: 0,
          buildings: 0,
          trading: 0,
          research: 0,
          guild: 0,
          city: 0,
          leader: 0,
        };

        //Readjust Drawer
        $scope.menus.players.height += 35;
        $scope.$openDrawer.css('max-height', $scope.menus.players.height + 'px');
      }
    };
    $scope.removePlayer = function (sender) {
      delete $scope.$parent.players[sender];
      var tableIndex = $('th[data-id="' + sender.toLowerCase() + '"]').index();

      $('.table-score tr').each(function () {
        $('td, th', this).get(tableIndex).remove();
      });
    };
  }]);


  /** Directives **/


  /** Run **/
  wonderApp.run(function() {
    FastClick.attach(document.body);
  });
})();
