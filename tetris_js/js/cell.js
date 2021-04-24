function Cell(x, y, color, figureId, obsticles, state = STATES.FALLING) {
  // Public properties
  this.x = x;
  this.y = y;
  this.color = color;
  this.state = state;
  this.figureId = figureId;
  this.obsticles = obsticles;

  // Private methods
  const hasObsticlesFor = (direction) => {
    const dirrections = {
      [DOWN]:  { x: this.x,     y: this.y - 1 },
      [RIGHT]: { x: this.x + 1, y: this.y },
      [LEFT]:  { x: this.x - 1, y: this.y },
    };
    const {x, y} = dirrections[direction];

    return obsticles.some(({cells}) =>
      cells.some(cell => cell.figureId !== this.figureId && cell.x === x && cell.y === y)
    );
  }

  const willReachBoarders = (direction) => {
    const dirrections = {
      [DOWN]:  this.y - 1 < 0,
      [RIGHT]: this.x + 1 > PLAYGROUND_WIDTH - 1, // TODO: looks strange, no? +1 -1 :)
      [LEFT]:  this.x - 1 < 0,
    };

    return dirrections[direction]
  }

  // Public methods
  this.validFor = (direction) =>
    !hasObsticlesFor(direction) && !willReachBoarders(direction);

  // TODO: deRender and render are identical. it's possible to refactor.
  //       also, this seems to be more of playground class responsibility?
  this.deRender = () =>
    helperMethods.styleCell(this.x, this.y, DEFAULT_COLOR);

  this.render = () =>
    helperMethods.styleCell(this.x, this.y, this.color);

  this.moveDown = () => {
    this.y--;
    this.render();
  };

  this.moveRight = () => {
    this.x++;
    this.render()
  };

  this.moveLeft = () => {
    this.x--;
    this.render()
  };

  this.destroy = () => {
    this.deRender()
    this.state = STATES.DESTROYED;
  };
}
