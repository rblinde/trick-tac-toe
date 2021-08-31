class Game {
  constructor(canvasElem) {
    this.canvas = canvasElem;
    this.ctx = canvasElem.getContext('2d');
    this.board = {};

    this.addEventListeners();
    this.handleWindowResize();
  }


  /**
   * Handles all event listeners
   */
  addEventListeners() {
    window.addEventListener('resize', () => this.handleWindowResize(), false);
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
      this.ctx.strokeStyle = '#fcbf49';
      this.ctx.stroke();
    }
  }


  /**
   * Main event loop
   */
  draw() {
    this.drawBoard();

    window.requestAnimationFrame(() => this.draw());
  }


  /**
   * Starts a game of trick-tac-toe
   */
  start() {
    this.draw();
  }
}

export default Game;
