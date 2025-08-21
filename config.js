// Configuration file for Music Player App
// This file contains sample data for demonstration purposes

// Sample songs for demo (replace with your actual songs)
const sampleSongs = [
  {
    id: 1,
    title: "Sample Song 1",
    artist: "Sample Artist",
    cover: "https://via.placeholder.com/300x300/667eea/ffffff?text=Song+1",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Sample Song 2",
    artist: "Sample Artist",
    cover: "https://via.placeholder.com/300x300/764ba2/ffffff?text=Song+2",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Sample Song 3",
    artist: "Sample Artist",
    cover: "https://via.placeholder.com/300x300/ff6b6b/ffffff?text=Song+3",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

// Use sample songs if no local songs are available
if (typeof songs === 'undefined' || songs.length === 0) {
  window.songs = sampleSongs;
}
