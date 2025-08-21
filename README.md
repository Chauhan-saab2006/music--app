# 🎵 Music Player App

A beautiful, responsive music player built with vanilla HTML, CSS, and JavaScript. Features a modern glassmorphism design with full playback controls.

## ✨ Features

- 🎶 **Full Music Player**: Play, pause, skip, shuffle, repeat
- 🔍 **Search Functionality**: Search songs by title or artist
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Modern UI**: Glassmorphism design with smooth animations
- ⌨️ **Keyboard Shortcuts**: Full keyboard control support
- 🎯 **Playlist Management**: Organize your favorite tracks

## 🚀 Quick Start

### Option 1: Clone and Use Local Files
1. Clone the repository
2. Add your MP3 files to the `songs/` folder
3. Add cover images to the `imges/` folder
4. Update `songs.js` with your music metadata
5. Open `index.html` in your browser

### Option 2: Use GitHub Releases (Recommended)
1. Download the latest release from [Releases](../../releases)
2. Extract and run locally

## 🎵 Adding Your Music

1. **Add Audio Files**: Place your `.mp3` files in the `songs/` directory
2. **Add Cover Art**: Add corresponding `.jpg` images in the `imges/` directory (300x300px recommended)
3. **Update Metadata**: Edit `songs.js` to include your songs:

```javascript
{
  id: 1,
  title: "Your Song Title",
  artist: "Artist Name",
  cover: "imges/your-cover.jpg",
  file: "songs/your-song.mp3"
}
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Play/Pause |
| ← | Previous Song |
| → | Next Song |
| ↑ | Volume Up |
| ↓ | Volume Down |

## 🛠️ Development

### File Structure
```
music-app/
├── index.html          # Main HTML file
├── index.css           # Styles
├── index.js            # Main JavaScript
├── songs.js            # Song data
├── songs/              # Audio files (not in repo)
├── imges/              # Cover images (not in repo)
└── README.md
```

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Glassmorphism
- **Vanilla JavaScript**: ES6+ features
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🎨 Customization

### Colors
The app uses CSS custom properties for easy theming. Edit the root variables in `index.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #ff6b6b;
}
```

### Fonts
Change the font family in `index.css`:

```css
body {
  font-family: 'Your Font', sans-serif;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include browser version and steps to reproduce

---

Made with ❤️ for music lovers
