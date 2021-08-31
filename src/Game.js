class Game {
  constructor(canvasElem) {
    this.canvas = canvasElem;
    this.ctx = canvasElem.getContext('2d');

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
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}

export default Game;
