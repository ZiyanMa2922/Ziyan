# week9
I started by looking at the examples in this week's LLM. One of the examples redrew and connected several points on the body, which made me wonder if connecting all the points on the left and right hands in a hand gesture interaction could create a magic-like effect.
I took 21 points from each hand and connected every point on one hand to every point on the other hand, creating dense lines. I wanted this effect to start when two fingers touched, so I added a condition to trigger the drawing of the lines. When the distance between the index fingertips of the two hands is less than 55, the lines start to appear. As the distance between the two hands increases, I use map() to map the distance to the opacity of a black overlay, making the image gradually darker. When both hands can no longer be detected at the same time, the image resets.
I felt that the visual effect was a little boring, so I added another distance condition. When the distance between the two hands is greater than 300, a filter is applied to the image. I used the built-in black-and-white filter (THRESHOLD) in p5.js. I also tried changing the order of the code because I wanted the image to be unaffected by the black overlay controlled by map() when the filter was applied. However, I found that the strong black-and-white contrast made the lines between the hands less visible, so I changed it back.
During the process, I noticed that the camera image was reversed compared to my actual movements, which made it very difficult for me to adjust my movements each time. So I added transform: scaleX(-1); in CSS to mirror the entire image horizontally.

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
