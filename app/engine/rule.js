// favour check at each change instead of auxiliary memory for easier state managmenet
// favour pure fx for the same
let check = function(cells, color, i, j) {
  let boardWidth = cells.size;
  let boardHeight = cells.get(0).size;
  if (arguments.length < 4) {
    throw Error('Missing parameters for cell');
  }
  if (i < 0 || i >= boardHeight || j < 0 || j >= boardWidth) {
    return false;
  }
  return cells.getIn([j, i]) === color;
};

// i,j: starting cell for checking
// step: return a tuple
// binary search, then closer first
let checkFour = (cells, color, i, j, step) => {
  let offsets = [2, 1, 3, -1];

  let traversal = function(offsets) {
    if (!check(cells, color, i, j)) {
      return false;
    }
    let length = 1;
    let connect = false;
    for (let k = 0; k < offsets.length; k++) {
      let [m, n] = step(i, j, offsets[k]);
      if (check(cells, color, m, n)) {
        length++;
      } else if (offsets[k] === 2) {
        break;
      }

      if (length === 4) {
        connect = true;
        break;
      }
    }
    return connect;
  };

  return traversal(offsets) || traversal(offsets.map(o => o * -1));
};

let directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1]
];

let stepFactory = (di, dj) => ((i, j, steps) => [i + (steps * di), j + steps * dj]);

let checkAllDirections = (cells, color, i, j) => {
  return directions.map(([di, dj]) =>
    checkFour(cells, color, i, j, stepFactory(di, dj)))
    .some(t => t);
};

export {
    check,
    checkFour,
    checkAllDirections,
    stepFactory
};
