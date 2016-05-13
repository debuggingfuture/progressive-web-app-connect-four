// render the board
import template from './board.cmpt.html';
import {colorMap} from './engine/colors.js';
import {TURN, WON, RESTART} from './engine/events.js';
let HEIGHT = 6;
let WIDTH = 7;

export default class BoardCmptCtrl {
  constructor(boardSrvc, $scope) {
    this.height = HEIGHT;
    this.width = WIDTH;
    Object.assign(this, {
      boardSrvc,
      $scope
    });
    boardSrvc.create(HEIGHT, WIDTH);
    this.highlightCol = 0;
    this.refreshBoard();

    $scope.$on(RESTART, () => {
      this.blocked = false;
      this.boardSrvc.create(HEIGHT, WIDTH);
      this.refreshBoard();
    });
  }
  // Not ideal performance as increased watchers in dirty check cycle but good enough for nwo
  highlightCells(j) {
    return this.highlightCol === j && !this.blocked ? 'cornflowerblue' : 'white';
  }
  refreshBoard() {
    this.discs = [];
    let cells = this.boardSrvc.board.getCells();
    for (let i = 0; i < HEIGHT; i++) {
      for (let j = 0; j < WIDTH; j++) {
        this.discs.push(
          {
            i: i,
            j: j,
            color: colorMap[cells[j][i]]
          }
          );
      }
    }
  }

  toggleHighlight(j) {
    this.highlightCol = j;
  }
  dropDisc(j) {
    if (this.blocked) {
      return;
    }

    let [insertedAt, won] = this.boardSrvc.board.dropDisc(this.currentColor, j);
    if (won) {
      this.blocked = true;
      this.$scope.$emit(WON);
    } else if (insertedAt > -1) {
      this.$scope.$emit(TURN);
    }
    this.refreshBoard();
  }
  }

BoardCmptCtrl.$inject = ['boardSrvc', '$scope'];

export default {
  template: template,
  bindings: {
    currentColor: '='
  },
  controllerAs: 'vm',
  controller: BoardCmptCtrl
};
