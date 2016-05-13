import Board from './engine/board.js';
export default class boardSrvc {
  create(height, width) {
    this.board = new Board(height, width);
  }
}
