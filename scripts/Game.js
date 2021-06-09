const gameover = document.getElementsByClassName("gameover")[0];
class Game {
  constructor() {
    this.sky = new Sky();
    this.bird = new Bird();
    this.land = new Land(-120);
    this.prepipe = new pipePareProducer(-120);
    this.timer = null;
    this.tick = 16;
    this.gameover = false;
  }
  start() {
    if (this.gameover) {
      window.location.reload();
    }
    if (this.timer) {
      return;
    }
    gameover.style.display = "none";
    this.prepipe.startProduce();
    this.timer = setInterval(() => {
      const duration = this.tick / 1000;
      this.sky.move(duration);
      this.land.move(duration);
      this.bird.move(duration);
      this.bird.startSwing();
      this.prepipe.pair.forEach((ele) => {
        ele.move(duration);
      });
      if (this.isGameOver()) {
        this.stop();
        this.gameover = true;
        gameover.style.display = "block";
      }
    }, this.tick);
  }
  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.bird.stopSwing();
    this.prepipe.stopProduce();
  }
  isHit(rec1, rec2) {
    // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
    // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
    var centerX1 = rec1.left + rec1.width / 2;
    var centerY1 = rec1.top + rec1.height / 2;
    var centerX2 = rec2.left + rec2.width / 2;
    var centerY2 = rec2.top + rec2.height / 2;
    var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
    var disY = Math.abs(centerY1 - centerY2); //中心点总想距离
    if (
      disX < (rec1.width + rec2.width) / 2 &&
      disY < (rec1.height + rec2.height) / 2
    ) {
      return true;
    }
    return false;
  }
  isGameOver() {
    if (this.bird.top === this.bird.maxY) {
      return true;
    }
    for (let i = 0; i < this.prepipe.pair.length; i++) {
      const pair = this.prepipe.pair[i];
      if (
        this.isHit(this.bird, pair.upPipe) ||
        this.isHit(this.bird, pair.downPipe)
      ) {
        return true;
      }
    }
    return false;
  }
  bindEvent() {
    window.onkeydown = (e) => {
      if (e.key === "Enter") {
        if (this.timer) {
          this.stop();
        } else {
          this.start();
        }
      }
      if (e.key === " ") {
        this.bird.jump();
      }
    };
  }
}
var g = new Game();
g.bindEvent();
