console.log("entry");
import 'angular-material';
import 'angular-material/angular-material.min.css';
import './index.css';
require('offline-plugin/runtime').install();


import boardCmpt from './app/board.cmpt.js';
import boardSrvc from './app/board.srvc.js';
import TwoPlayCtrl from './app/views/2p.ctrl.js';
import MenuCtrl from './app/views/menu.ctrl.js';

let app = angular.module('app',  ['ngRoute', 'ngMaterial'])
.component('boardCmpt',boardCmpt)
.service('boardSrvc',boardSrvc)
.controller('MainCtrl',function(){
  let vm = this;
  vm.text = 'Hello world!';
  vm.finishLoading = true;
  console.log(vm);
})
.controller('TwoPlayCtrl',TwoPlayCtrl)
.controller('MenuCtrl',MenuCtrl)
.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/2p', {
    templateUrl: 'app/views/2p.html',
    controller: 'TwoPlayCtrl',
    controllerAs: 'vm'
  }).
  when('/menu', {
    templateUrl: 'app/views/menu.html',
    controller: 'MenuCtrl'
  }).
  when('/about', {
    templateUrl: 'app/views/about.html'
  }).
  otherwise({
    redirectTo: '/menu'
  });
}]);




// app.controller('ListCtrl', function($scope, $mdDialog) {
//   $scope.toppings = [
//     { name: 'Pepperoni', wanted: true },
//     { name: 'Sausage', wanted: false },
//     { name: 'Black Olives', wanted: true },
//     { name: 'Green Peppers', wanted: false }
//   ];
//   $scope.messages = [
//     {id: 1, title: "Message A", selected: false},
//     {id: 2, title: "Message B", selected: true},
//     {id: 3, title: "Message C", selected: true},
//   ];
//   $scope.people = [
//     { name: 'Janet Perkins', img: 'img/100-0.jpeg', newMessage: true },
//     { name: 'Mary Johnson', img: 'img/100-1.jpeg', newMessage: false },
//     { name: 'Peter Carlsson', img: 'img/100-2.jpeg', newMessage: false }
//   ];
//   $scope.goToPerson = function(person, event) {
//     $mdDialog.show(
//       $mdDialog.alert()
//       .title('Navigating')
//       .textContent('Inspect ' + person)
//       .ariaLabel('Person inspect demo')
//       .ok('Neat!')
//       .targetEvent(event)
//     );
//   };
//   $scope.navigateTo = function(to, event) {
//     //apps state
//     // switch(to):
//     //   case '1p':
//     //   case '2p':
//     //     console.log('2p');
//     //   default:
//     //     return '';
//     //
//     // $mdDialog.show(
//     //   $mdDialog.alert()
//     //     .title('Navigating')
//     //     .textContent('Imagine being taken to ' + to)
//     //     .ariaLabel('Navigation demo')
//     //     .ok('Neat!')
//     //     .targetEvent(event)
//     // );
//   };
//   $scope.doSecondaryAction = function(event) {
//     $mdDialog.show(
//       $mdDialog.alert()
//       .title('Secondary Action')
//       .textContent('Secondary actions can be used for one click actions')
//       .ariaLabel('Secondary click demo')
//       .ok('Neat!')
//       .targetEvent(event)
//     );
//   };
// });
