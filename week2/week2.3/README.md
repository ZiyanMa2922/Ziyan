# week2

3. week2.3 version

For the third version, I wanted to try creating a nice color gradient and a dynamic rotation effect. I experimented with the position of the squares and the values in fill() to create a row of rotating squares that gradually changed from dark blue to light blue. At first, I didn’t add translate() between each push() and pop(), so I found that all the shapes were rotating around the same center point togeter. After adding different translate() values between each push() and pop(), I was able to fix the problem and make each square rotate around its own position.

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
