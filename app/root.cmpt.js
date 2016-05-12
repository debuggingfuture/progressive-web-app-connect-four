// render the board
// export default class RootCmptCtrl {
//   constructor() {
//
//   }
// }

export default {
  template: '<ng-outlet></ng-outlet>',
  bindings: {},
  // controller: RootCmptCtrl,
  $routeConfig: [
   {path: '/game/...', name: 'game', component: 'game', useAsDefault: true},
   {path: '/heroes/...', name: 'Heroes', component: 'heroes' }
 ]
}
