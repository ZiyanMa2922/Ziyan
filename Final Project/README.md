# Final Project
Final Project Proposal
Previous Assignment
I want to continue exploring my Week 11 Weather Data Visualization assignment as my Final Project because this project is more closely related to my daily life. When I check the weather forecast, although I can access a lot of accurate weather data, it is difficult to intuitively understand what the weather outside actually feels like through these numbers. In my Week 11 assignment, I tried to transform wind speed, wind direction, and temperature into dynamic visual effects and simulate the feeling of being in the wind through the interaction between the mouse and particles.


Proposed Development
I hope to retain the original concept of transforming weather data into perceptible visual effects and further enhance the interaction between people and the webpage. I do not want this webpage to simply be an information display platform like a weather forecast, but rather a webpage that allows people to connect and interact with it.
While looking for references, I came across different visual representations of weather data in Refik Anadol's Wind of Boston. I want to build on my original particle effects by adding richer visual elements and using different visuals to express the different sensations that weather itself can bring to people. If possible, I hope these visuals can be dynamically generated based on real weather data. I also want to explore switching between different visual representations through interactions with the webpage.
In terms of interaction, I want to extend the previous mouse interaction to hand or body motion tracking, allowing people to interact with the weather elements on the screen through their own bodies, as if they were actually standing in the wind.
In addition, I want to explore more factors that influence how people perceive weather, especially apparent temperature. Sometimes, even when the actual temperature is the same, changes in sunlight, wind speed, and humidity can make people feel differently. I want to try obtaining these weather data and explore how to express the difference between actual temperature and apparent temperature through visual effects and body interaction. In this way, I can use this webpage to get a general sense of what the weather outside feels like.


Implementation & Challenges
I plan to continue using the Open-Meteo API to obtain weather data. In addition to the original temperature, wind speed, and wind direction data, I want to include apparent temperature, solar radiation, and humidity, and explore suitable ways to represent them visually.
I need to further explore particle movement, different generative visual effects, and how to switch between different visual representations. I also want to build on the camera image processing and hand tracking techniques I learned previously, learn more about human body segmentation, and explore whether particles can interact with body outlines and movements.
I also want to make the interaction between particles and the human body look more natural. I want to transform different weather data into visual effects that convey meaningful sensory experiences, rather than simply adding more information or decorative visual elements.
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
