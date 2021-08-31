class Pawn {
  constructor(color, size) {
    this.color = color;
    this.size = [25, 40, 50][size - 1]

    this.x = Math.random() * window.innerWidth - this.size;
    this.y = Math.random() * window.innerHeight - this.size;
  }


  /**
   * Moves pawn to new coordinates
   * @param {Number} x
   * @param {Number} y
   */
  move(x, y) {
    this.x = x;
    this.y = y;
  }


  /**
   * Draws pawn
   * @param {Object} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default Pawn;
