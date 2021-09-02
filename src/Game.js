import * as constants from './constants';

class Game {
  constructor() {
    this.boardElem = document.getElementById('board');
    this.pieceElems = [...document.querySelectorAll('.pieces input[type="radio"]')];
    this.tileElems = [...this.boardElem.children];
    this.messageElem = document.getElementById('message');

    this.isPlaying = false;
    this.board = Array(9).fill({ player: null, size: 0 });
    this.currentPlayer = null;
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

    if (color !== this.currentPlayer || !this.isPlaying) {
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
    if (!this.selectedPiece || !this.isPlaying) {
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

    // Check for possible game end
    this.checkGameEnded();
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
   * Checks if game is either won or no moves are possible
   */
  checkGameEnded() {
    const winner = this.checkWin();
    const noMoves = this.checkNoMoves();

    if (!winner && !noMoves) {
      return false;
    }

    const message = winner ? winner + ' wins!' : 'Draw!';
    this.showMessage(message);
    this.isPlaying = false;
  }


  /**
   * Checks if current board has a winner
   * @returns {String|Boolean} winning color or false
   */
  checkWin() {
    for (const [x, y, z] of constants.WIN_MAP) {
      if (
        this.board[x].player &&
        this.board[x].player === this.board[y].player &&
        this.board[x].player === this.board[z].player
      ) {
        return this.board[x].player;
      }
    }

    return false;
  }


  /**
   * Checks if current board has no possible moves
   * @returns {Boolean}
   */
  checkNoMoves() {
    const remainingPieces = this.getRemainingPieces();
    const highestPiece = Math.max(...remainingPieces);
    const filter = place => place.size < highestPiece && place.player !== this.currentPlayer;
    const possibleOptions = this.board.filter(filter);
    return !possibleOptions.length;
  }


  /**
   * Returns remaining pieces for current player
   * @returns {Set}
   */
  getRemainingPieces() {
    const pieceElems = [...document.querySelectorAll(`.pieces--${this.currentPlayer} .piece:not(.hide)`)];
    const mapper = piece => parseInt(piece.querySelector('input').value);
    return [...new Set(pieceElems.map(mapper))];
  }


  /**
   * Shows message in center of screen to indicate game over
   * @param {String} text
   */
  showMessage(text) {
    this.messageElem.textContent = text;
    this.messageElem.dataset.text = text;
    this.messageElem.classList.remove('hide');
    setTimeout(() => this.messageElem.classList.add('hide'), 1000);
  }


  /**
   * Starts a game of trick-tac-toe
   */
  start() {
    this.isPlaying = true;
    this.currentPlayer = Math.random() < 0.5 ? 'red' : 'blue';
    this.showMessage(`${this.currentPlayer} starts!`);

    for (const piece of this.pieceElems) {
      piece.checked = false;
    }
  }
}

export default Game;
