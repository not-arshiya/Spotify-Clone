# Spotify Clone

A responsive web-based Spotify clone developed using HTML, CSS, and JavaScript. This project recreates the core functionality and user interface of Spotify's web player, allowing users to browse playlists, view songs, and control music playback through a clean and interactive interface.

The application dynamically loads playlists and song data from local folders, making it easy to customize and expand without modifying the JavaScript code. New playlists can be added simply by creating a folder containing audio files, a cover image, and an `info.json` file.

## Features

- Responsive Spotify-inspired user interface
- Dynamic playlist loading
- Automatic song list generation
- Audio playback with play and pause controls
- Previous and next track navigation
- Interactive seek bar with song progress
- Real-time song duration display
- Volume control with mute functionality
- Playlist metadata loaded from JSON files
- Easily customizable playlists without changing the source code

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)

## Project Structure

```
Spotify-Clone/
│
├── img/
│   ├── play.svg
│   ├── pause.svg
│   ├── volume.svg
│   ├── mute.svg
│   └── ...
│
├── songs/
│   ├── all/
│   ├── LadyGaga/
│   ├── MichaelJackson/
│   ├── Radiohead/
│   ├── TheBeatles/
│   ├── GunsNRoses/
│   ├── Elvis/
│   ├── BonnieTyler/
│   ├── Maneskin/
│   └── ...
│
├── index.html
├── style.css
├── utility.css
└── script.js
```

Each playlist folder contains:

- `cover.jpg` – Playlist cover image
- `info.json` – Playlist title and description
- `.mp3` files – Songs included in the playlist

Example:

```
LadyGaga/
├── cover.jpg
├── info.json
├── Poker Face.mp3
├── Bad Romance.mp3
└── Shallow.mp3
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/spotify-clone.git
```

### Navigate to the project

```bash
cd spotify-clone
```

### Run the project

Open the project in Visual Studio Code and launch `index.html` using the **Live Server** extension.

The application requires a local web server because JavaScript uses the Fetch API to load playlists and metadata.

## Customizing Playlists

Adding a new playlist requires no changes to the JavaScript source code.

1. Create a new folder inside the `songs` directory.
2. Add your `.mp3` files.
3. Add a `cover.jpg` image.
4. Create an `info.json` file containing:

```json
{
  "title": "Playlist Name",
  "description": "Short playlist description."
}
```

The playlist will automatically appear in the application.


## Disclaimer

This project is created solely for educational and learning purposes. It is inspired by Spotify's user interface but is not affiliated with, endorsed by, or associated with Spotify. All trademarks, logos, and copyrighted material belong to their respective owners.