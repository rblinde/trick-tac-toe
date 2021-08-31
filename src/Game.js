class Game {
  constructor() {
    this.boardElem = document.getElementById('board');
    this.selected = null;

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
    const screenSize = Math.min(window.innerWidth, window.innerHeight);
    const maxSize = Math.min(screenSize, 600);

    this.boardElem.style.width = maxSize + 'px';
    this.boardElem.style.height = maxSize + 'px';
  }


  /**
   * Starts a game of trick-tac-toe
   */
  start() {
    // TODO
  }
}

export default Game;
