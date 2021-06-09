const birdDom = document.getElementsByClassName("bird")[0];
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdLeft = parseFloat(birdStyles.left);
const birdTop = parseFloat(birdStyles.top);
const gameDom = document.querySelector(".game");
const gameHeight = gameDom.clientHeight;
class Bird extends Rectangle {
  constructor() {
    super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
    this.g = 1000;
    this.maxY = gameHeight - landHeight - this.height;
    this.swingStatus = 1;
    this.timer = null;
    this.render();
  }
  render() {
    super.render();
    this.dom.className = `bird swing${this.swingStatus}`;
  }
  startSwing() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.swingStatus++;
      if (this.swingStatus === 4) {
        this.swingStatus = 1;
      }
      this.render();
    }, 200);
  }
  stopSwing() {
    clearInterval(this.timer);
    this.timer = null;
  }
  move(duration) {
    super.move(duration);
    this.ySpeed += this.g * duration;
    // console.log(this.ySpeed);
  }
  onMove() {
    if (this.top < 0) {
      this.top = 0;
    } else if (this.top > this.maxY) {
      this.top = this.maxY;
    }
  }
  jump() {
    this.ySpeed = -300;
  }
}
// let bird = new Bird();
// setInterval(() => {
//   bird.move(16 / 1000);
// }, 16);
