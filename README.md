# Premium Proposal Website

A polished, premium proposal experience built with pure HTML, CSS, and vanilla JavaScript for GitHub Pages.

## Features
- Elegant landing experience with glassmorphism and animated gradients
- Story pages, typewriter section, proposal card, and celebration screen
- Interactive escape button with playful behavior
- Soft animated effects, dark mode, and a handwritten love letter modal
- Responsive timeline, countdown, and a heartfelt proposal experience

## How to run locally
1. Open the project folder in a browser directly, or run a simple local server:
   ```bash
   cd /path/to/proposal-website
   python3 -m http.server 8000
   ```
2. Visit http://localhost:8000

## How to deploy on GitHub Pages
1. Push this project to a GitHub repository.
2. Open the repository on GitHub.
3. Go to Settings > Pages.
4. Select the main branch and the root folder.
5. Save and wait for the site to publish.

## How to replace photos
Place your images in the assets/photos folder and update the image list in script.js.

## How to change names
Edit the text directly in index.html for the names and messages you want to display.

## How to change the wedding date
Update the weddingDate variable in script.js:
```js
const weddingDate = new Date('2026-12-12T00:00:00');
```

## How to replace music
Replace the audio file at assets/music.mp3 with your own MP3 file.

## How to customize colors
Edit the CSS variables in style.css under :root and :root[data-theme='dark'].
