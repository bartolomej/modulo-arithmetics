document.addEventListener('keyup', e => {
  if (e.code === 'ArrowUp') {
    stepSize *= 2;
  }
  if (e.code === 'ArrowDown') {
    stepSize /= 2;
  }
});

const width = () => window.innerWidth;
const height = () => window.innerHeight - 5;

let moduloNumber = 0;
let totalNumber = 200;
let stepSize = 0.001;

const simulation = s => {
  let canvas;

  s.setup = () => {
    canvas = s.createCanvas(width(), height());
    canvas.parent('simulationCanvas');
  };

  s.draw = () => {
    s.background(255);
    s.noFill();
    s.noStroke();

    s.textSize(15);
    s.fill('rgb(0,0,0)');
    s.text(moduloNumber, 10, 20);

    let cDiameter = height() / 1.2;
    s.stroke(0);
    s.noFill();
    s.translate(width() / 2, height() / 2);
    s.ellipse(0, 0, cDiameter, cDiameter);

    let k = (moduloNumber * Math.PI) / totalNumber;
    for (let i = 0; i < totalNumber; i++) {
      let x = cDiameter / 2 * Math.cos(i * k);
      let y = cDiameter / 2 * Math.sin(i * k);
      s.fill(0);
      s.ellipse(x, y, 10, 10);
    }

    for (let i = 0; i < totalNumber; i++) {
      let n = (i * moduloNumber);
      let x0 = cDiameter / 2 * Math.cos(i * k);
      let y0 = cDiameter / 2 * Math.sin(i * k);
      let x1 = cDiameter / 2 * Math.cos(n * k);
      let y1 = cDiameter / 2 * Math.sin(n * k);
      s.stroke(tinycolor("#fc0303").spin(moduloNumber * 2).toRgbString());
      s.line(x0, y0, x1, y1);
    }

    moduloNumber += stepSize;
  };

  s.windowResized = () => {
    s.resizeCanvas(width(), height());
  };

};

const simulationP5 = new p5(simulation);