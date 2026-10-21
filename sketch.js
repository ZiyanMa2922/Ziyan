
let cards;

function setup() {
  noCanvas();

  cards = selectAll(".project");

  console.log("Found cards:", cards.length);

  for (let i = 0; i < cards.length; i++) {

    let card = cards[i];

    // Remove original rectangular background
    card.style("background-color", "transparent");
    card.style("border", "none");
    card.style("border-radius", "0");
    card.style("box-shadow", "none");

    // Keep the card content above the paper
    card.style("position", "relative");
    card.style("isolation", "isolate");

    // Create hand-drawn paper background
    createPaper(card, i);

    // Mouse into card
    card.mouseOver(function() {

      card.style(
        "transform",
        "translateY(-8px) scale(1.02)"
      );

      let paper = card.elt.querySelector(".paper-shape");
      let svg = card.elt.querySelector(".paper-svg");

      paper.style.fill =
        "rgba(255, 255, 255, 0.82)";

      svg.style.filter =
        "drop-shadow(0 18px 20px rgba(0, 0, 0, 0.14))";
    });

    // Mouse leave card
    card.mouseOut(function() {

      card.style(
        "transform",
        "translateY(0) scale(1)"
      );

      let paper = card.elt.querySelector(".paper-shape");
      let svg = card.elt.querySelector(".paper-svg");

      paper.style.fill =
        "rgba(255, 255, 255, 0.24)";

      svg.style.filter =
        "drop-shadow(0 8px 12px rgba(0, 0, 0, 0.08))";
    });
  }

  // Mouse position controls background color
  document.addEventListener("mousemove", function(event) {

    let x = constrain(
      event.clientX,
      0,
      window.innerWidth
    );

    let hue = map(
      x,
      0,
      window.innerWidth,
      0,
      360
    );

    document.body.style.backgroundColor =
      "hsl(" + hue + ", 25%, 78%)";
  });
}


// Create hand-drawn paper
function createPaper(card, index) {

  // Different fixed random seed for each card
 let seed = 100 + index * 50;

if (index === 1) {
  seed = seed + 1;
}

randomSeed(seed);

  let points = [];

  // Control the irregularity of edges
  let roughness = 0.8;

  let left = 2;
  let right = 98;
  let top = 2;
  let bottom = 98;

  // Top edge
  for (let i = 0; i <= 10; i++) {

    points.push({
      x: left + i * (right - left) / 10,
      y: top + random(-roughness, roughness)
    });
  }

  // Right edge
  for (let i = 1; i <= 10; i++) {

    points.push({
      x: right + random(-roughness, roughness),
      y: top + i * (bottom - top) / 10
    });
  }

  // Bottom edge
  for (let i = 9; i >= 0; i--) {

    points.push({
      x: left + i * (right - left) / 10,
      y: bottom + random(-roughness, roughness)
    });
  }

  // Left edge
  for (let i = 10; i >= 1; i--) {

    points.push({
      x: left + random(-roughness, roughness),
      y: top + i * (bottom - top) / 10
    });
  }


  let pathData = createSmoothPath(points);

  let svgNS = "http://www.w3.org/2000/svg";

  let svg = document.createElementNS(
    svgNS,
    "svg"
  );

  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("class", "paper-svg");

  // SVG position and size
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.zIndex = "-1";
  svg.style.overflow = "visible";
  svg.style.pointerEvents = "none";

  svg.style.filter =
    "drop-shadow(0 8px 12px rgba(0, 0, 0, 0.08))";

  svg.style.transition = "filter 0.3s ease";

  // Create paper shape
  let path = document.createElementNS(
    svgNS,
    "path"
  );

  path.setAttribute("d", pathData);
  path.setAttribute("class", "paper-shape");

  // Paper transparency
  path.style.fill =
    "rgba(255, 255, 255, 0.24)";

  // Paper outline
  path.style.stroke =
    "rgba(255, 255, 255, 0.65)";

  path.style.strokeWidth = "0.5";

  path.style.transition = "fill 0.3s ease";

  // Add path into SVG
  svg.appendChild(path);

  // Add SVG into project card
  card.elt.insertBefore(
    svg,
    card.elt.firstChild
  );
}


// Create a smooth closed curve
function createSmoothPath(points) {

  let n = points.length;

  let d = "";

  for (let i = 0; i < n; i++) {

    // Four neighboring points
    let p0 = points[(i - 1 + n) % n];
    let p1 = points[i];
    let p2 = points[(i + 1) % n];
    let p3 = points[(i + 2) % n];


    let tension = 6.1;

    // First control point
    let cp1x =
      p1.x + (p2.x - p0.x) * tension / 6;

    let cp1y =
      p1.y + (p2.y - p0.y) * tension / 6;

    // Second control point
    let cp2x =
      p2.x - (p3.x - p1.x) * tension / 6;

    let cp2y =
      p2.y - (p3.y - p1.y) * tension / 6;

    // Move to the first point
    if (i === 0) {

      d += "M " + p1.x + " " + p1.y + " ";
    }

    d += "C "
      + cp1x + " "
      + cp1y + ", "
      + cp2x + " "
      + cp2y + ", "
      + p2.x + " "
      + p2.y + " ";
  }

  d += "Z";

  return d;
}
