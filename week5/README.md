# week5.3clock
My idea is to represent time through falling water drops and the changing water level.

Every second, a white water drop falls from the top of the screen. At the same time, the background gradually becomes lighter, so the white drop slowly blends into the background.

After 60 seconds, the water level rises a little, representing one minute. Then a new minute begins, and the background changes to another random color. It gradually becomes lighter again.

This process keeps repeating, and the water level rises every minute. After one hour, the water fills the entire canvas.

At the end of the hour, the water level gradually goes down until the canvas is empty, and the clock starts a new cycle.

As the water drop falls, I gradually increase the change in its y-position each frame to simulate gravity. This makes the drop fall faster and faster, creating a more natural movement.
## Getting Started

Open `index.html` in your web browser and start editing `sketch.js`.

## Running Locally

For projects with media files, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"
```

## Resources

- [p5.js 2.0](https://beta.p5js.org/)
- [p5.js Reference](https://p5js.org/reference/)
