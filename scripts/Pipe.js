const gameWidth = gameDom.clientWidth;
class Pipe extends Rectangle {
  constructor(height, top, speed, dom) {
    super(52, height, gameWidth, top, speed, 0, dom);
  }
  onMove() {
    if (this.left < -this.width) {
      this.dom.remove();
    }
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
class Prepipe {
  constructor(speed) {
    this.spaceHeight = 150;
    this.minHeight = 80;
    this.maxHeight = landTop - this.spaceHeight - this.minHeight;
    const upHeight = getRandom(this.minHeight, this.maxHeight);
    const upPipeDom = document.createElement("div");
    upPipeDom.className = "pipe up";
    this.upPipe = new Pipe(upHeight, 0, speed, upPipeDom);
    const downHeight = landTop - this.spaceHeight - upHeight;
    const downTop = landTop - downHeight;
    const downPipeDom = document.createElement("div");
    downPipeDom.className = "pipe down";
    this.downPipe = new Pipe(downHeight, downTop, speed, downPipeDom);
    gameDom.appendChild(upPipeDom);
    gameDom.appendChild(downPipeDom);
  }
  get useless() {
    return this.upPipe.left < -this.upPipe.width;
  }
  move(duration) {
    this.upPipe.move(duration);
    this.downPipe.move(duration);
  }
}
class pipePareProducer {
  constructor(speed) {
    this.timer = null;
    this.tick = 1500;
    this.pair = [];
    this.speed = speed;
  }
  startProduce() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.pair.push(new Prepipe(this.speed));
      for (let i = 0; i < this.pair.length; i++) {
        var p = this.pair[i];
        if (p.useless) {
          this.pair.splice(i, 1);
          i--;
        }
      }
    }, this.tick);
  }
  stopProduce() {
    clearInterval(this.timer);
    this.timer = null;
  }
}

// var produce = new pipePareProducer(-120);
// produce.startProduce();
// setInterval(() => {
//   produce.pair.forEach((ele) => {
//     ele.move(16 / 1000);
//   });
// }, 16);
