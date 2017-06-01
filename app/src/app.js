'use strict';

angular
  .module('liveCharacterSheet', [
    'ngMaterial',
    'ngRoute',
    'ngAria',
    'angular-cache'
  ])
  .config(function($mdThemingProvider, $mdIconProvider, $routeProvider){

    var home = {
      templateUrl: 'src/home/partial.html',
      controller: 'AppController',
      controllerAs: 'vm'
    };

    $routeProvider
      .when('/', home)
      .when('/login', {
        templateUrl: 'src/login/partial.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: 'src/register/partial.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .when('/game/:id', {
        templateUrl: 'src/game/session/partial.html',
        controller: 'GameController',
        controllerAs: 'vm'
      })
      .when('/stats', {
        templateUrl: 'src/game/stats/partial.html',
        controller: 'StatsController',
        controllerAs: 'vm'
      })
      .when('/skills', {
        templateUrl: 'src/game/skills/partial.html',
        controller: 'SkillsController',
        controllerAs: 'vm'
      })
      .when('/abilities', {
        templateUrl: 'src/game/abilities/partial.html',
        controller: 'AbilitiesController',
        controllerAs: 'vm'
      })
      .when('/items', {
        templateUrl: 'src/game/items/partial.html',
        controller: 'ItemsController',
        controllerAs: 'vm'
      })
      .otherwise(home);

    $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("menu", "./assets/svg/menu.svg", 24)
      .icon("share", "./assets/svg/share.svg", 24)

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red');
  })
  .run(function() {
    // Init Auth
    console.info('@TODO:  Init Authentication')
  });

var app = angular.module('liveCharacterSheet');

app.controller('AppController', ['$mdSidenav', function($mdSidenav) {
  angular.extend(this, {
    toggleMenu: toggleMenu,
    menuItems: [
      {
        name: 'Home',
        path: '/'
      },
      {
        name: 'Stats',
        path: '/#/stats'
      },
      {
        name: 'Skills',
        path: '/#/skills'
      },
      {
        name: 'Abilities',
        path: '/#/abilities'
      },
      {
        name: 'Items',
        path: '/#/items'
      }
    ]
  });

  function toggleMenu() {
    $mdSidenav('left').toggle();
  }
}]);

app.controller('StatsController', function() {
  console.info('stats');
});

app.controller('SkillsController', function() {
  console.info('skills');
});

app.controller('AbilitiesController', function() {
  console.info('abilities');
});

app.controller('ItemsController', function() {
  console.info('items');
});

app.controller('GameController', [
  'GameSessionService',
  '$routeParams',
  function(GameSessionService, $routeParams) {
    angular.extend(this, {
      sessionId: $routeParams.id,
      sessions: [],
      newSession: newSession
    });

    function newSession() {
      this.sessions.push()
    }
}]);

app.controller('LoginController', function() {
  console.info('login');
});

app.controller('RegisterController', function() {
  console.info('register');
});

app.factory('GameSessionsService', ['GameSessionService', function(GameSessionService) {

  function GameSessions() {
    this.sessions = [];
  }

  angular.extend(GameSessions, {
    newSession: function() {
      this.sessions.push(GameSessionService.newService());
    }
  });

}]);

app.factory('GameSessionService', ['PlayerService', function(PlayerService) {

  function GameSession() {
    this.title = 'Session';
    this.players = [];
  }

  angular.extend(GameSession, {
    newSession: newSession
  });

  angular.extend(GameSession.prototype, {
    addPlayer: addPlayer,
    editSession: editSession
  });

  function addPlayer(player) {
    this.players.push(player);
  }

  function editSession(title) {
    this.title = title;
  }

  function newSession() {
    return new GameSession();
  }

  return GameSession;
}]);

app.factory('PlayerService', function() {

});

