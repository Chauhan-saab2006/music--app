// Music Player App Class
class MusicPlayer {
    constructor() {
        // DOM Elements for player functionality
        this.audio = document.getElementById('audio-player');                        // Audio element
        this.playlist = document.getElementById('playlist');                         // Playlist container
        this.currentSongImg = document.getElementById('current-song-img');           // Album cover
        this.currentSongTitle = document.getElementById('current-song-title');       // Song title
        this.currentSongArtist = document.getElementById('current-song-artist');     // Song artist name
        this.playPauseBtn = document.getElementById('play-pause-btn');               // Play/Pause button
        this.prevBtn = document.getElementById('prev-btn');                          // Previous song button
        this.nextBtn = document.getElementById('next-btn');                          // Next song button
        this.progressBar = document.getElementById('progress-bar');                  // Progress bar
        this.currentTimeEl = document.getElementById('current-time');                // Current playback time
        this.durationEl = document.getElementById('duration');                       // Total duration
        this.volumeSlider = document.getElementById('volume-slider');                // Volume control slider
        this.shuffleBtn = document.getElementById('shuffle-btn');                    // Shuffle button
        this.repeatBtn = document.getElementById('repeat-btn');                      // Repeat button
        this.searchInput = document.getElementById('search-input');                  // Search input box
        this.searchBtn = document.getElementById('search-btn');                      // Search button

        // Player states 
        this.currentSongIndex = 0;     // Tracks the currently playing song
        this.isPlaying = false;        // Play/Pause status
        this.isShuffled = false;       // Shuffle mode
        this.isRepeating = false;      // Repeat mode
        this.filteredSongs = [...songs]; // Songs after applying search filter

        this.init(); // Initialize the player
    }

    // Initialize player: render playlist, load song, and bind events
    init() {
        this.renderPlaylist();
        this.loadSong(this.currentSongIndex);
        this.bindEvents();
    }

    // Render playlist dynamically based on filtered songs
    renderPlaylist() {
        this.playlist.innerHTML = ''; // Clear previous list
        this.filteredSongs.forEach((song, index) => {
            const songElement = this.createSongElement(song, index);
            this.playlist.appendChild(songElement);
        });
    }

    // Create individual song element for playlist
    createSongElement(song, index) {
        const songDiv = document.createElement('div');
        songDiv.className = 'song-item';
        songDiv.dataset.index = index;

        // Song UI structure
        songDiv.innerHTML = `
            <img src="${song.cover}" alt="${song.title}">
            <div class="song-info-item">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-duration">--:--</div>
        `;

        // On click, play the selected song
        songDiv.addEventListener('click', () => this.playSong(index));
        return songDiv;
    }

    // Load song details into the player
    loadSong(index) {
        const song = this.filteredSongs[index];
        this.audio.src = song.file;
        this.currentSongImg.src = song.cover;
        this.currentSongTitle.textContent = song.title;
        this.currentSongArtist.textContent = song.artist;

        // Highlight the active song in the playlist
        document.querySelectorAll('.song-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeSong = document.querySelector(`[data-index="${index}"]`);
        if (activeSong) activeSong.classList.add('active');
    }

    // Play selected song
    playSong(index) {
        this.currentSongIndex = index;
        this.loadSong(index);
        this.play();
    }

    // Play current audio
    play() {
        this.isPlaying = true;
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Change icon to pause
        this.playPauseBtn.classList.add('playing');
        this.audio.play();
    }

    // Pause current audio
    pause() {
        this.isPlaying = false;
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Change icon to play
        this.playPauseBtn.classList.remove('playing');
        this.audio.pause();
    }

    // Toggle play/pause
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    // Go to next song (or shuffle if enabled)
    nextSong() {
        if (this.isShuffled) {
            this.currentSongIndex = Math.floor(Math.random() * this.filteredSongs.length);
        } else {
            this.currentSongIndex = (this.currentSongIndex + 1) % this.filteredSongs.length;
        }
        this.loadSong(this.currentSongIndex);
        if (this.isPlaying) this.play();
    }

    // Go to previous song
    prevSong() {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.filteredSongs.length) % this.filteredSongs.length;
        this.loadSong(this.currentSongIndex);
        if (this.isPlaying) this.play();
    }

    // Update progress bar and time display
    updateProgress() {
        const { currentTime, duration } = this.audio;
        const progressPercent = (currentTime / duration) * 100;
        this.progressBar.value = progressPercent;

        // Update current and total time
        this.currentTimeEl.textContent = this.formatTime(currentTime);
        this.durationEl.textContent = this.formatTime(duration);
    }

    // Seek to specific point in the audio
    setProgress(e) {
        const width = this.progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        this.audio.currentTime = (clickX / width) * duration;
    }

    // Convert seconds to MM:SS format
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Adjust volume based on slider
    setVolume() {
        this.audio.volume = this.volumeSlider.value / 100;
    }

    // Toggle shuffle mode
    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        this.shuffleBtn.classList.toggle('active', this.isShuffled);
    }

    // Toggle repeat mode
    toggleRepeat() {
        this.isRepeating = !this.isRepeating;
        this.repeatBtn.classList.toggle('active', this.isRepeating);
    }

    // Filter songs based on search input
    searchSongs() {
        const searchTerm = this.searchInput.value.toLowerCase();
        this.filteredSongs = songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) || 
            song.artist.toLowerCase().includes(searchTerm)
        );
        this.currentSongIndex = 0;
        this.renderPlaylist();
        if (this.filteredSongs.length > 0) {
            this.loadSong(0);
        }
    }

    // Bind all UI events to functions
    bindEvents() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());

        // Previous/Next buttons
        this.prevBtn.addEventListener('click', () => this.prevSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());

        // Progress bar click
        this.progressBar.addEventListener('click', (e) => this.setProgress(e));

        // Update progress during playback
        this.audio.addEventListener('timeupdate', () => this.updateProgress());

        // Volume control
        this.volumeSlider.addEventListener('input', () => this.setVolume());

        // Shuffle and Repeat
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());

        // Search functionality
        this.searchInput.addEventListener('input', () => this.searchSongs());
        this.searchBtn.addEventListener('click', () => this.searchSongs());

        // Handle song end
        this.audio.addEventListener('ended', () => {
            if (this.isRepeating) {
                this.audio.currentTime = 0;
                this.play();
            } else {
                this.nextSong();
            }
        });

        // Keyboard shortcuts for controls
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space': // Play/Pause
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'ArrowLeft': // Previous song
                    this.prevSong();
                    break;
                case 'ArrowRight': // Next song
                    this.nextSong();
                    break;
                case 'ArrowUp': // Increase volume
                    this.volumeSlider.value = Math.min(100, parseInt(this.volumeSlider.value) + 10);
                    this.setVolume();
                    break;
                case 'ArrowDown': // Decrease volume
                    this.volumeSlider.value = Math.max(0, parseInt(this.volumeSlider.value) - 10);
                    this.setVolume();
                    break;
            }
        });
    }
}

// Initialize the music player when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});

// Utility: Format file size (optional feature)
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Show loading state (optional)
function showLoading() {
    document.body.classList.add('loading');
}

// Hide loading state (optional)
function hideLoading() {
    document.body.classList.remove('loading');
}

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Music Player Error:', e.error);
});

// Register service worker for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            console.log('Service Worker registration failed');
        });
    });
}
