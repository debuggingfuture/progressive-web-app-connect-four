/* global it, describe */
import Board, {createCells, updateCell, insertCell} from './board';
import {expect} from 'chai';
import _ from 'lodash';
import {YELLOW, RED, EMPTY} from './colors.js';
describe('board', () => {
  it("should create board with immutable cells init with Empty", function() {
    let board = new Board(6, 7);
    let cells = board.getCells();
    expect(_.flatten(cells).length).to.eql(6 * 7);
    expect(cells[0][0]).to.eql(EMPTY);
    expect(cells[6][5]).to.eql(EMPTY);
    expect(cells[6][6]).to.be.undefined;
    expect(cells[7]).to.be.undefined;
  });
  it('should updateCell', function() {
    let cells = createCells(5, 4);
    let value = Symbol('TEST');
    let updatedCells = updateCell(cells, value, 0, 0);
    expect(updatedCells.getIn([0, 0])).eql(value);
    expect(updatedCells).not.eql(cells);
  });

  it('should insert if there is space', function() {
    let cells = createCells(5, 4)
      .setIn([3, 0], EMPTY)
      .setIn([3, 1], YELLOW)
      .setIn([3, 2], YELLOW)
      .setIn([3, 3], YELLOW)
      .setIn([3, 4], YELLOW);

    let [i, updatedCells] = insertCell(cells, YELLOW, 3);
    console.log(updatedCells.getIn([3, 0]));
    expect(updatedCells.getIn([3, 0])).eql(YELLOW);
  });

  it('should not insert if there is no space', function() {
    let cells = createCells(5, 4).map(rows => rows.map(() => YELLOW));
    let [i, updatedCells] = insertCell(cells, RED, 3);
    expect(updatedCells.getIn([3, 2])).eql(YELLOW);
    expect(updatedCells.getIn([3, 5])).eql(undefined);
  });

  it("should throw error for 0 wdith", function() {
    expect(() => new Board(1, 0)).to.throw(Error);
  });
  it("should throw error for 0 height", function() {
    expect(() => new Board(0, 1)).to.throw(Error);
  });
});
