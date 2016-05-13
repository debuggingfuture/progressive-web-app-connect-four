// favour check at each change instead of auxiliary memory for easier state managmenet
// favour pure fx for the same
const check = function(cells, color, i, j) {
  const boardWidth = cells.size;
  const boardHeight = cells.get(0).size;
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
const checkFour = (cells, color, i, j, step) => {
  const offsets = [2, 1, 3, -1];

  const traversal = function(offsets) {
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

const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1]
];

const stepFactory = (di, dj) => ((i, j, steps) => [i + (steps * di), j + steps * dj]);

const checkAllDirections = (cells, color, i, j) => {
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
