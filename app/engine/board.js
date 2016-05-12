// State
import Immutable from 'immutable';
import {EMPTY} from './colors.js';
import {
    checkAllDirections
} from './rule.js';
//Keep i, j matrix conventions but flip at actual data structure for easier insertion
export let createCells =function(height,width) {
  return Immutable.List(
    Array(width).fill(Immutable.List(Array(height).fill(EMPTY)))
  );
}
export let updateCell =function(cells,value, i,j) {
  return cells.updateIn([j,i],()=>value);
}

export let insertCell = function (cells, value, j) {
  let height = cells.get(j).size;
  let insertedAt= -1;
  for(let i =height-1; i>=0; i--){
    if(cells.getIn([j,i])===EMPTY){
      cells = cells.setIn([j,i],value);
      insertedAt = i;
      break;
    }
  }
  return [insertedAt,cells];
}
// export let printCell = function (cells) {
//
//   cells.map(
//     row=>row.map(
//       cell=> cell === YELLOW ? 'X'
//     )
//   )
// }


export default class Board {
    constructor(height, width) {
        if (height <= 0 || width <= 0) {
            throw Error('wrong height & width');
        }
        this.cells = createCells(height,width);
    }
    dropDisc(color,j) {
      //keep i,j conventions
      console.log('Drop Disc ',color,'Column:',j);
      let [i, updatedCells] = insertCell(this.cells, color,  j);

      let colorWon;
      if(i>-1){
        this.cells = updatedCells;
        colorWon = checkAllDirections(updatedCells,color, i,j);
      }
      return [i, colorWon];
    }
    getCells() {
      return this.cells.toJSON();
    }
}
