import Pawn from './Pawn';
import * as constants from './constants';

class Game {
  constructor(canvasElem) {
    this.canvas = canvasElem;
    this.ctx = canvasElem.getContext('2d');
    this.board = {};
    this.pawns = [];
    this.selected = null;

    this.addEventListeners();
    this.handleWindowResize();
  }


  /**
   * Handles all event listeners
   */
  addEventListeners() {
    window.addEventListener('resize', () => this.handleWindowResize(), false);
    this.canvas.addEventListener('mousedown', (e) => this.handleMousedown(e), false);
    this.canvas.addEventListener('mousemove', (e) => this.handleMousemove(e), false);
    this.canvas.addEventListener('mouseup', () => this.handleMouseup(), false);
  }


  /**
   * Resizes canvas to fill screen completely
   */
  handleWindowResize() {
    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;

    this.canvas.width = wWidth;
    this.canvas.height = wHeight;

    this.board = {
      x: wWidth / 2 - 300,
      y: wHeight / 2 - 300,
      width: 600,
      height: 600,
    }
  }


  /**
   * Checks whether user selects active pawn
   * @param {Event} e
   */
  handleMousedown(e) {
    const selectedPawn = this.getClickedPawn(e.x, e.y);

    if (!selectedPawn) {
      return false;
    }

    this.pawns = [
      ...this.pawns.filter(p => p.x !== selectedPawn.x || p.y !== selectedPawn.y),
      selectedPawn,
    ];

    this.selected = {
      pawn: selectedPawn,
      offsetX: e.x - selectedPawn.x,
      offsetY: e.y - selectedPawn.y,
    };

    this.canvas.classList.toggle('grab');
  }


  /**
   * Moves selected pawn to new location
   * @param {Event} e
   */
  handleMousemove(e) {
    if (!this.selected) {
      return false;
    }

    this.selected.pawn.move(
      e.x - this.selected.offsetX,
      e.y - this.selected.offsetY,
    );
  }


  /**
   * Resets selected pawn
   */
  handleMouseup() {
    if (!this.selected) {
      return false;
    }

    this.selected = null;
    this.canvas.classList.toggle('grab');
  }


  /**
   * Creates 6 pawns for each player
   */
  createPawns() {
    for (const size of constants.SIZES) {
      this.pawns.push(
        new Pawn(constants.COLORS.blue, size),
        new Pawn(constants.COLORS.red, size),
      );
    }
  }


  /**
   * Returns active pawn user clicked on
   * @param   {Number} x
   * @param   {Number} y
   * @returns {Object|Boolean}
   */
  getClickedPawn(x, y) {
    for (let i = this.pawns.length - 1; i >= 0; i--) {
      const pawn = this.pawns[i];
      const distance = (pawn.x - x) ** 2 + (pawn.y - y) ** 2;

      if (distance <= pawn.size ** 2) {
        return pawn;
      }
    }

    return false;
  }


  /**
   * Draws the default tic-tac-toe board in the center
   * of the screen
   */
  drawBoard() {
    const lines = [[
      this.board.x, + this.board.y + this.board.height / 3,
      this.board.x + this.board.width, this.board.y + this.board.height / 3,
    ], [
      this.board.x, + this.board.y + this.board.height / 3 * 2,
      this.board.x + this.board.width, this.board.y + this.board.height / 3 * 2,
    ], [
      this.board.x + this.board.width / 3, this.board.y,
      this.board.x + this.board.width / 3, this.board.y + this.board.height,
    ], [
      this.board.x + this.board.width / 3 * 2, this.board.y,
      this.board.x + this.board.width / 3 * 2, this.board.y + this.board.height,
    ]];

    for (const [x1, y1, x2, y2] of lines) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineWidth = 10;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = constants.COLORS.yellow;
      this.ctx.stroke();
    }
  }


  /**
   * Main event loop
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBoard();
    this.pawns.forEach(pawn => pawn.draw(this.ctx));

    window.requestAnimationFrame(() => this.draw());
  }


  /**
   * Starts a game of trick-tac-toe
   */
  start() {
    this.createPawns();
    this.draw();
  }
}

export default Game;
