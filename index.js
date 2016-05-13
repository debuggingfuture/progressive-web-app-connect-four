console.log("entry");
import 'angular-material';
import 'angular-material/angular-material.min.css';
import './index.css';
require('offline-plugin/runtime').install();

import boardCmpt from './app/board.cmpt.js';
import boardSrvc from './app/board.srvc.js';
import TwoPlayCtrl from './app/views/2p.ctrl.js';
import MenuCtrl from './app/views/menu.ctrl.js';

import twoPlayTemplate from './app/views/2p.html';
import menuTemplate from './app/views/menu.html';
import aboutTemplate from 'app/views/about.html';

angular.module('app', ['ngRoute', 'ngMaterial'])
.component('boardCmpt', boardCmpt)
.service('boardSrvc', boardSrvc)
.controller('MainCtrl', function() {
  let vm = this;
  vm.text = 'Hello world!';
  vm.finishLoading = true;
  console.log(vm);
})
.controller('TwoPlayCtrl', TwoPlayCtrl)
.controller('MenuCtrl', MenuCtrl)
.config(['$routeProvider',
function($routeProvider) {
  $routeProvider
  .when('/2p', {
    templateUrl: twoPlayTemplate,
    controller: 'TwoPlayCtrl',
    controllerAs: 'vm'
  })
  .when('/menu', {
    templateUrl: menuTemplate,
    controller: 'MenuCtrl'
  })
  .when('/about', {
    templateUrl: aboutTemplate
  })
  .otherwise({
    redirectTo: '/menu'
  });
}]);
