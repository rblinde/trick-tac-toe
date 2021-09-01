class Game {
  constructor() {
    this.boardElem = document.getElementById('board');
    this.pieceElems = [...document.querySelectorAll('.pieces input[type="radio"]')];
    this.tileElems = [...this.boardElem.children];
    this.board = Array(9).fill(0);
    this.currentPlayer = 'red';
    this.selectedPiece = null;

    this.addEventListeners();
    this.handleWindowResize();
  }


  /**
   * Handles all event listeners
   */
  addEventListeners() {
    window.addEventListener('resize', () => this.handleWindowResize(), false);
    this.pieceElems.forEach(piece => piece.addEventListener('click', (e) => this.handlePieceClick(e), false));
    this.tileElems.forEach(tile => tile.addEventListener('click', (e) => this.handleTileClick(e), true));
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
   * Sets selected piece if color matches current player
   * @param {Event} e
   */
  handlePieceClick(e) {
    const color = e.target.parentNode.parentNode.dataset.color;

    if (color !== this.currentPlayer) {
      e.target.checked = false;
      return false;
    }

    this.selectedPiece = e.target;
  }


  /**
   * If possible, places piece of current player in selected tile
   * @param {Event} e
   */
  handleTileClick(e) {
    if (!this.selectedPiece) {
      return false;
    }

    const tileElem = e.target.closest('.tile');
    const index = this.tileElems.indexOf(tileElem);
    const size = parseInt(this.selectedPiece.value);

    if (this.board[index].size >= size) {
      return false;
    }

    // Update board
    this.updateTile(index, size);
    this.board[index] = { size, player: this.currentPlayer };

    // Switch player and reset piece
    this.currentPlayer = this.currentPlayer === 'red' ? 'blue' : 'red';
    this.selectedPiece.parentNode.classList.add('hide');
    this.selectedPiece = null;
  }


  /**
   * Updates DOM element of tile via `index`
   * @param {Number} index
   * @param {Number} size
   */
  updateTile(index, size) {
    const piece = document.createElement('div');
    piece.classList.add('ppiece', `ppiece--${size}`, `ppiece--${this.currentPlayer}`);
    this.tileElems[index].textContent = null;
    this.tileElems[index].appendChild(piece);
  }


  /**
   * Starts a game of trick-tac-toe
   */
  start() {
    for (const piece of this.pieceElems) {
      piece.checked = false;
    }
  }
}

export default Game;
