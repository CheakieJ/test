const skyDom = document.getElementsByClassName("sky")[0];
const skyStyles = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyles.width);
const skyHeight = parseFloat(skyStyles.height);
class Sky extends Rectangle {
  constructor() {
    super(skyWidth, skyHeight, 0, 0, -100, 0, skyDom);
  }
  onMove() {
    if (this.left <= -skyWidth / 2) {
      this.left = 0;
    }
  }
}
// let sky = new Sky();
// setInterval(() => {
//   sky.move(16 / 1000);
// }, 16);
