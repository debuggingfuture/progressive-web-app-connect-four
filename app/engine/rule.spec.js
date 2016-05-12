'use strict';
import {
    createCells,
    updateCell
} from './board.js';
import {
    expect
} from 'chai';
import {
    check,
    checkFour,
    checkAllDirections,
    stepFactory
} from './rule.js';
import {
    YELLOW,
    RED
} from './colors.js'

describe('rules', () => {
    beforeEach(() => {});
    describe('#check', () => {
        it("should return true if match color", () => {
            let cells = createCells(6, 7);
            let updatedCells = updateCell(cells, YELLOW, 5, 4);
            expect(check(updatedCells, YELLOW, 5, 4)).to.be.true;
            expect(check(updatedCells, RED, 5, 4)).to.be.false;
        })

    })
    describe('stepFactory', () => {
        it('should return fx', () => {
            expect(typeof(stepFactory(0, 1))).eql('function');
        })
    })
    describe('check for connect', () => {
        it("should match horizontal", () => {
            let cells = createCells(7, 6)
                .setIn([0, 0], RED)
                .setIn([1, 0], YELLOW)
                .setIn([2, 0], YELLOW)
                .setIn([3, 0], YELLOW)
                .setIn([4, 0], YELLOW)
                .setIn([5, 0], RED);

            expect(checkFour(cells, YELLOW, 0, 0, stepFactory(0, 1))).to.be.false;
            expect(checkFour(cells, YELLOW, 0, 1, stepFactory(0, 1))).to.be.true;
            expect(checkFour(cells, YELLOW, 0, 2, stepFactory(0, 1))).to.be.true;
            expect(checkFour(cells, YELLOW, 0, 3, stepFactory(0, 1))).to.be.true;
            expect(checkFour(cells, YELLOW, 0, 4, stepFactory(0, 1))).to.be.true;
            expect(checkFour(cells, YELLOW, 0, 5, stepFactory(0, 1))).to.be.false;
        });

        it("should match vertical", () => {
            let cells = createCells(7, 6)
                .setIn([0, 0], YELLOW)
                .setIn([0, 1], YELLOW)
                .setIn([0, 2], YELLOW)
                .setIn([0, 3], YELLOW);

            expect(checkAllDirections(cells, YELLOW, 0, 0)).to.be.true;
            expect(checkAllDirections(cells, YELLOW, 3, 0)).to.be.true;
        });

        it("should match for corner", () => {
          let cells = createCells(7, 6)
              .setIn([5, 6], YELLOW)
              .setIn([5, 5], YELLOW)
              .setIn([5, 4], YELLOW)
              .setIn([5, 3], YELLOW);

          expect(checkAllDirections(cells, YELLOW, 6, 5)).to.be.true;
        })
        it("should match diagonal", () => {
            let cells = createCells(7, 6)
                .setIn([0, 0], YELLOW)
                .setIn([1, 1], YELLOW)
                .setIn([2, 2], YELLOW)
                .setIn([3, 3], YELLOW);
            expect(checkAllDirections(cells, YELLOW, 0, 0)).to.be.true;
            expect(checkAllDirections(cells, YELLOW, 3, 3)).to.be.true;
        });

        it("should not match when consective length <4", () => {
            let cells = createCells(7, 6)
                .setIn([0, 0], YELLOW)
                .setIn([0, 1], RED)
                .setIn([0, 2], YELLOW)
                .setIn([0, 3], YELLOW)
                .setIn([0, 4], YELLOW)
                .setIn([0, 5], RED);
            expect(checkAllDirections(cells, YELLOW, 0, 0)).to.be.false;
            expect(checkAllDirections(cells, YELLOW, 1, 0)).to.be.false;
            expect(checkAllDirections(cells, YELLOW, 2, 0)).to.be.false;
            expect(checkAllDirections(cells, YELLOW, 3, 0)).to.be.false;
            expect(checkAllDirections(cells, YELLOW, 4, 0)).to.be.false;
        });


        it("should throw error if missing params ", () => {
            let cells = createCells(5, 4);
            expect(() => check(cells)).to.throw(Error);
        })

        it("should not throw error at boundary", () => {
            let cells = createCells(4, 4);
            expect(() => checkAllDirections(cells, YELLOW, 0, 0)).not.to.throw(Error);
            expect(() => checkAllDirections(cells, YELLOW, 3, 3)).not.to.throw(Error);
        });

    });
})
