import Board from './engine/board.js'
export default class boardSrvc {
  constructor(){
  }
  create(height,width) {
    this.board = new Board(height,width);
  }
}
