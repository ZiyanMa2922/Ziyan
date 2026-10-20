
let cards;

function setup() {
  noCanvas();

  // 找到全部六张卡片
  cards = selectAll(".project");

  console.log("Found cards:", cards.length);

  for (let i = 0; i < cards.length; i++) {

    let card = cards[i];

    // 鼠标进入卡片
    card.mouseOver(function() {
      card.style(
        "transform",
        "translateY(-8px) scale(1.02)"
      );

      card.style(
        "box-shadow",
        "0 18px 40px rgba(0, 0, 0, 0.14)"
      );

      card.style(
        "background-color",
        "rgba(255, 255, 255, 0.82)"
      );
    });

    // 鼠标离开卡片
    card.mouseOut(function() {
      card.style(
        "transform",
        "translateY(0) scale(1)"
      );

      card.style(
        "box-shadow",
        "0 8px 25px rgba(0, 0, 0, 0.08)"
      );

      card.style(
        "background-color",
        "rgba(255, 255, 255, 0.65)"
      );
    });
  }

  // 鼠标控制背景颜色
  document.addEventListener("mousemove", function(event) {

    let x = constrain(event.clientX, 0, window.innerWidth);

    let hue = map(x, 0, window.innerWidth, 0, 360);

    document.body.style.backgroundColor =
      "hsl(" + hue + ", 25%, 78%)";
  });
}
