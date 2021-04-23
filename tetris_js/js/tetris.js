function Tetris(state = GAME_STATES.PAUSED) {
  // Private properties
  const playground = PlaygroundFactory.getInstance();
  let gameInverval = null;

  // public properties
  this.figures = []; // TODO: seems to not be accessible outside

  // Private methods
  const addFigure = () => {
      const newFigure = new Figure(this.figures);
      this.figures.push(newFigure);
      return newFigure;
  };

  const getCurrentFigure = () =>
    this.figures.find(figure => figure.state === STATES.FALLING) || addFigure();

  const events = (keyCode) => {
    const eventsMap = {
      [DOWN]() {
        getCurrentFigure().moveDown();
      },
      [RIGHT]() {
        getCurrentFigure().moveRight();
      },
      [LEFT]() {
        getCurrentFigure().moveLeft();
      },
      [PAUSE]() {
        if (state === GAME_STATES.PLAYING) {
          state = GAME_STATES.PAUSED;
        }
        else if(state === GAME_STATES.PAUSED) {
          state = GAME_STATES.PLAYING;
        }
      },
    }
    if (state !== GAME_STATES.GAMEOVER) {
      eventsMap[keyCode] && eventsMap[keyCode]();
    }
  };

  const destroyLine = () => {
    // TODO
  };

  const checkForGameOver = () => {
    for(let figure of this.figures) {
      if (figure.state === STATES.STATIC) {
        for (let cell of figure.cells) {
          if (cell.y > PLAYGROUND_HEIGHT) {
            alert("Game over!");
            state = GAME_STATES.GAMEOVER;
          }
        }
      }
    }
  };

  // public methods
  this.play = () => {
    this.state = GAME_STATES.PLAYING; // TODO:

    playground.render();
    document.addEventListener('keydown', ({keyCode}) =>  events(keyCode));

    gameInverval = setInterval(() => { // TODO: maybe it's better to have a separate method for this?
      if (state === GAME_STATES.PLAYING) {
        checkForGameOver();
        getCurrentFigure().moveDown();
        destroyLine(); // TODO: not sure where this method shoud be. Maybe in moveDown?
      }
    }, INTERVAL);
  };
}

const tetris = new Tetris();
tetris.play()
