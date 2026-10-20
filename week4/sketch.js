
function setup() {
  noCanvas();
  document.addEventListener("mousemove", function(event) {
    let x = constrain(event.clientX, 0, window.innerWidth);
  
    let hue = map(x, 0, window.innerWidth, 0, 360);
    document.body.style.backgroundColor =
      "hsl(" + hue + ", 25%, 78%)";

  });
}
