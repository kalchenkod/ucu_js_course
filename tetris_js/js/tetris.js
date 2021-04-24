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
        if (state === GAME_STATES.PLAYING) {
          getCurrentFigure().moveDown();
        }
      },
      [RIGHT]() {
        if (state === GAME_STATES.PLAYING) {
          getCurrentFigure().moveRight();
        }
      },
      [LEFT]() {
        if (state === GAME_STATES.PLAYING) {
          getCurrentFigure().moveLeft();
        }
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
    let cellsArr = [];
    let ground = new Array(PLAYGROUND_HEIGHT);
    for (let i = 0; i < PLAYGROUND_HEIGHT; i++) {
      ground[i] = [0, 0, 0, 0, 0, 0, 0];
    }

    for(let figure of this.figures) {
      if (figure.state === STATES.STATIC) {
        for (let cell of figure.cells) {
          if (cell.y >= 0) {
            cellsArr.push(cell);
            ground[cell.y][cell.x] = 1;
          }
          }
        }
      }

    let num_full = 0;
    let full_ind = [];
    for (let i = 0; i < PLAYGROUND_HEIGHT; i++) {
      let full = true;
      for (let el of ground[i]) {
        if (el === 0) {
          full = false;
        }
      }
      if (full) {
        num_full++;
        full_ind.push(i);
      }
    }

    for (let cell of cellsArr) {
      if (full_ind.includes(cell.y)) {
        cell.destroy();
      }
    }

    for (let cell of cellsArr) {
      for (let i = 0; i < num_full; i++){
        cell.moveDown();
      }
    }
  };

  const checkForGameOver = () => {
    for(let figure of this.figures) {
      if (figure.state === STATES.STATIC) {
        for (let cell of figure.cells) {
          if (cell.y + 1 > PLAYGROUND_HEIGHT) {
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
        destroyLine();
      }
    }, INTERVAL);
  };
}

const tetris = new Tetris();
tetris.play()
