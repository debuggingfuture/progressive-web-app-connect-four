import {RED, YELLOW, colorMap} from '../engine/colors.js';
import {TURN, WON, RESTART} from '../engine/events.js';

export default class TwoPlayCtrl {
  constructor($scope) {
    this.$scope = $scope;
    this.restart();
    $scope.$on(TURN, () => {
      this._updateTurn();
    });
    this.$scope = $scope;
    $scope.$on(WON, () => {
      this.gameover = true;
      this._updateDisplayedPlayer();
    });
  }
  restart() {
    this.starterTurn = true;
    this.gameover = false;
    this._updateTurn();
    this.$scope.$broadcast(RESTART);
  }
  _updateDisplayedPlayer() {
    this.currentPlayer = this.currentColor === YELLOW ? 'Yellow' : 'Red';
    this.displayColor = colorMap[this.currentColor];
  }
  _updateTurn() {
    this.currentColor = this.getNextColor();
    this._updateDisplayedPlayer();
  }
  getNextColor() {
    const color = this.starterTurn ? YELLOW : RED;
    this.starterTurn = !this.starterTurn;
    return color;
  }
}

TwoPlayCtrl.$inject = ['$scope'];
