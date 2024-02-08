const DEFAULT_SIZE = 8;
const MAX_SIZE = 128;
const MAX_HISTORY_SIZE = 25;


class Game {
  #size = DEFAULT_SIZE;
  #cellCount;
  #board = []; // map entry ([index (int), isAlive (int 0|1)])
  #endConditionMet = false;
  #historyList = [];

  constructor(size, seed) {
    if (size > MAX_SIZE) {
      throw new Error("Size of grid is too big");
    }

    this.#size = size || this.#size;
    this.#cellCount = Math.pow(this.#size, 2);

    if (seed) {
      if (seed.length !== this.#cellCount) {
        throw new Error("Seed size did not match cell count");
      }
      this.#board = seed;
    } else {
      for (let i = 0; i < this.#cellCount; i++) {
        let isAlive = Math.random() >= 0.5; // get 50/50 split
        this.#board[i] = isAlive;
      }
    }
  }

  get size() {
    return this.#size;
  }

  get board() {
    return this.#board;
  }

  get endConditionMet() {
    return this.#endConditionMet;
  }

  set board(board) {
    this.#board = board;
    return this.#board;
  }

  static getEmptyBoard(size) {
    if (size > MAX_SIZE) {
      throw new Error("Size was greater than max allowed size");
    }
    return new Array(Math.pow(size, 2)).fill(false);
  }

  updateCell(index, newIsAlive) {
    this.#board[index] = newIsAlive;
  }

  getPreviousStep() {
    const previousBoard = this.#historyList.pop();
    if (previousBoard !== "undefined") {
      this.#endConditionMet = false;
      this.#board = previousBoard;
    }
    return previousBoard;
  }

  getHistoryListLength() {
    return this.#historyList.length;
  }

  /**
   * Method to calculate the next step and determine which cells are alive or dead
   */
  calculateNextStep() {
    let newBoard = [];

    this.#historyList = this.#addOldBoardToHistory(
      this.#historyList,
      this.#board
    );

    for (let i = 0; i < this.#board.length; i++) {
      const numberOfAliveNeighbors = this.#getNumberOfAliveNeighbors(
        i,
        this.#size,
        this.#board
      );
      const isAlive = this.#board[i];
      newBoard[i] =
        numberOfAliveNeighbors === 3 ||
        (isAlive && numberOfAliveNeighbors === 2);
    }

    this.#endConditionMet = this.#checkIfEndConditionIsMet(
      this.#board,
      newBoard
    );
    this.#board = newBoard;
  }

  /**
   * Method to check if the board did not change between steps and therefore game has ended
   * private
   */
  #checkIfEndConditionIsMet(board, newBoard) {
    for (let i = 0; i < board.length; i++) {
      if (newBoard[i] !== board[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Method to add a board that is about to be overwritten to the history Array
   * This allows stepping back to view previous states. Max length for the history is 25 entries.
   * private
   */
  #addOldBoardToHistory(historyList, board) {
    if (historyList.length >= MAX_HISTORY_SIZE) {
      historyList.shift(); // remove oldest board from history
    }
    historyList.push(board);
    return historyList;
  }

  /**
   * Method to get all neighbors of a cell
   * private
   */
  #getNumberOfAliveNeighbors(index, size, board) {
    let validNeighbors = [];
    let numberOfAliveNeighbors;

    validNeighbors = this.#getValidNeighbors(index, size);
    numberOfAliveNeighbors = this.#getNumberOfAliveCells(validNeighbors, board);

    return numberOfAliveNeighbors;
  }

  /**
   * Method to determine coordinates of neighbor cells for a given coordinate
   * private
   */
  #getValidNeighbors(index, size) {
    const preX = index % size !== 0;
    const preY = index >= size;
    const postX = index % size !== size - 1;
    const postY = index < Math.pow(size, 2) - size;
    let validNeighbors = [];

    if (preX) {
      validNeighbors.push(index - 1);
    }
    if (postX) {
      validNeighbors.push(index + 1);
    }
    if (preY) {
      validNeighbors.push(index - size);
    }
    if (postY) {
      validNeighbors.push(index + size);
    }
    if (preX && preY) {
      validNeighbors.push(index - (size + 1));
    }
    if (postX && preY) {
      validNeighbors.push(index - (size - 1));
    }
    if (preX && postY) {
      validNeighbors.push(index + (size - 1));
    }
    if (postX && postY) {
      validNeighbors.push(index + (size + 1));
    }

    return validNeighbors;
  }

  /**
   * Method to get number of alive cells on board from list of coordinates
   * private
   */
  #getNumberOfAliveCells(cells, board) {
    let numberOfAliveCells = 0;

    for (const index of cells) {
      let isAlive = board[index];
      numberOfAliveCells = isAlive
        ? numberOfAliveCells + 1
        : numberOfAliveCells;
    }

    return numberOfAliveCells;
  }
}

class GameView {
  constructor(gridElement, size, board) {
    this.render(gridElement, size, board);
  }

  /**
   * Method to render the game view in grid element by creating elements for cells
   */
  static render(gridElement, size, board) {
    let cellElements = [];

    // remove all cells from grid element
    while (gridElement.firstChild) {
      gridElement.removeChild(gridElement.lastChild);
    }

    gridElement.setAttribute(
      "style",
      `grid-template-columns: repeat(${size}, minmax(2px, 50px))`
    );

    for (let index = 0; index < board.length; index++) {
      let cellElement = document.createElement("div");
      let isAlive = board[index];
      cellElement.setAttribute("class", "cell");
      cellElement.setAttribute("onclick", "gameController.changeCell(this)");
      cellElement.dataset.index = index;
      cellElement.classList.toggle("alive", isAlive);
      cellElements.push(cellElement);
    }

    gridElement.append(...cellElements);
  }

  /**
   * Method to update cell status without rerendering grid
   */
  static updateAllCells(board) {
    for (let index = 0; index < board.length; index++) {
      const isAlive = board[index];
      let cellElement = document.querySelector(`[data-index="${index}"]`);
      cellElement.classList.toggle("alive", isAlive);
    }
  }

  /**
   * Method to update cell status without rerendering grid
   */
  static updateCell(index, isAlive) {
    let cellElement = document.querySelector(`[data-index="${index}"]`);
    cellElement.classList.toggle("alive", isAlive);
  }

  static endConditionIsMet() {
    const autoPlayBtn = document.getElementById("autoPlay");
    const nextBtn = document.getElementById("next");
    const endOfGameElement = document.getElementById("endOfGame");
    autoPlayBtn.disabled = true;
    nextBtn.disabled = true;
    endOfGameElement.classList.add("show");
  }

  static resetEndConditionIsMet() {
    const autoPlayBtn = document.getElementById("autoPlay");
    const nextBtn = document.getElementById("next");
    const endOfGameElement = document.getElementById("endOfGame");
    autoPlayBtn.disabled = false;
    nextBtn.disabled = false;
    endOfGameElement.classList.remove("show");
  }

  static enablePreviousStepBtn() {
    const previousStepBtn = document.getElementById("previous");
    previousStepBtn.disabled = false;
  }

  static disablePreviousStepBtn() {
    const previousStepBtn = document.getElementById("previous");
    previousStepBtn.disabled = true;
  }
}

class GameController {
  #gridElement;
  #game;
  #autoPlayId = null;

  constructor(Game, GameView, gridElement, gridSize) {
    let size = gridSize || DEFAULT_SIZE;
    this.#gridElement = gridElement;
    const emptyBoard = Game.getEmptyBoard(size);
    this.#game = new Game(size, emptyBoard);
    GameView.render(gridElement, size, this.#game.board);
  }

  startNewGame(size) {
    this.stopAutoPlay();
    const emptyBoard = Game.getEmptyBoard(size);
    this.#game = new Game(size, emptyBoard);
    GameView.render(this.#gridElement, size, this.#game.board);
    GameView.resetEndConditionIsMet(this.#gridElement);
  }

  startGameWithRandomSeed(size) {
    this.stopAutoPlay();
    this.#game = new Game(size);
    GameView.render(this.#gridElement, size, this.#game.board);
    GameView.resetEndConditionIsMet(this.#gridElement);
  }

  changeCell(cellElement) {
    this.stopAutoPlay();
    const index = parseInt(cellElement.dataset.index);
    const isAlive = cellElement.classList.contains("alive");

    this.#game.updateCell(index, !isAlive);

    GameView.updateCell(index, !isAlive);
  }

  nextStep() {
    if (!this.#game.endConditionMet) {
      this.#nextStep();
      this.stopAutoPlay();
    }
  }

  previousStep() {
    this.stopAutoPlay();
    GameView.resetEndConditionIsMet(this.#gridElement);
    const historyLength = this.#game.getHistoryListLength();
    if (historyLength > 0) {
      const previousBoard = this.#game.getPreviousStep();
      GameView.updateAllCells(previousBoard);
    } else {
      GameView.disablePreviousStepBtn();
    }
  }

  autoPlay() {
    if (!this.#game.endConditionMet && !this.#autoPlayId) {
      this.#autoPlayId = setInterval(() => this.#nextStep(), 500);
    } else {
      this.stopAutoPlay();
    }
  }

  stopAutoPlay() {
    if (this.#autoPlayId) {
      clearInterval(this.#autoPlayId);
      this.#autoPlayId = null;
    }
  }

  #nextStep() {
    this.#game.calculateNextStep();
    GameView.updateAllCells(this.#game.board);
    if (this.#game.endConditionMet) {
      this.stopAutoPlay();
      GameView.endConditionIsMet(this.#gridElement);
    }
    GameView.enablePreviousStepBtn();
  }
}

let gridElement = document.getElementById("board");
let sizeInput = document.getElementById("size");
let size = sizeInput.valueAsNumber;

sizeInput.addEventListener("input", function () {
  size = sizeInput.valueAsNumber;
  gridElement.dataset.size = size;
});

window.addEventListener(
  "keyup",
  ({ key }) => {
    switch (key) {
      case "ArrowLeft":
        gameController.previousStep();
        break;
      case "ArrowRight":
        gameController.nextStep();
        break;
      case "n":
        gameController.startNewGame(size);
        break;
      case "r":
        gameController.startGameWithRandomSeed(size);
        break;
      case "a":
        gameController.autoPlay();
        break;
    }
  },
  true
);

let gameController = new GameController(Game, GameView, gridElement, size);
