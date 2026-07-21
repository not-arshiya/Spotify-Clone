console.log("Lets write JavaScript");

let currentSong = new Audio();
let songs = [];
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

async function getSongs(folder) {
    currFolder = folder;

    let a = await fetch(`/${folder}/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");

    songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {
            let song = decodeURIComponent(
                element.href.split(`/${folder}/`)[1]
            );

            songs.push(song);
        }
    }

    // Show all songs
    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    for (const song of songs) {
        songUL.innerHTML += `
        <li>
            <img class="invert" width="34" src="img/music.svg" alt="">
            <div class="info">
                <div>${song}</div>
                <div></div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="img/play.svg" alt="">
            </div>
        </li>`;
    }

    // Click listeners
    Array.from(songUL.getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", () => {
            playMusic(
                e.querySelector(".info").firstElementChild.innerHTML.trim()
            );
        });
    });

    return songs;
}

const playMusic = async (track, pause = false) => {

    currentSong.src = encodeURI(`/${currFolder}/${track}`);

    if (!pause) {
        try {
            await currentSong.play();
            play.src = "img/pause.svg";
        } catch (err) {
            console.error(err);
        }
    }

    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function displayAlbums() {

    console.log("Displaying albums");

    const folders = [
        "all",
        "BonnieTylor",
        "Elvis",
        "GunsN'Roses",
        "LadyGaga",
        "Maneskin",
        "MichaelJackson",
        "Radiohead",
        "sombr",
        "TheBeatles",
    ];

    let cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = "";

    for (const folder of folders) {

        try {

            let a = await fetch(`/songs/${encodeURIComponent(folder)}/info.json`);
            let response = await a.json();

            cardContainer.innerHTML += `
                <div data-folder="${folder}" class="card">
                    <div class="play">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 20V4L19 12L5 20Z"
                                stroke="#141B34"
                                fill="#000"
                                stroke-width="1.5"
                                stroke-linejoin="round"/>
                        </svg>
                    </div>

                    <img src="/songs/${encodeURIComponent(folder)}/cover.jpg" alt="Cover">
                    <h2>${response.title}</h2>
                    <p>${response.description}</p>
                </div>`;

        } catch (err) {
            console.error(`Couldn't load album: ${folder}`, err);
        }
    }

    // Load playlist when album is clicked
    Array.from(document.getElementsByClassName("card")).forEach(card => {

        card.addEventListener("click", async (e) => {

            songs = await getSongs(`songs/${e.currentTarget.dataset.folder}`);

            if (songs.length > 0) {
                playMusic(songs[0]);
            }

        });

    });

}

async function main() {

    // Load default playlist
    await getSongs("songs/all");

    if (songs.length > 0) {
        playMusic(songs[0], true);
    }

    // Display albums
    await displayAlbums();

    // Play / Pause
    play.addEventListener("click", async () => {

        if (currentSong.paused) {
            await currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }

    });

    // Update duration & seekbar
    currentSong.addEventListener("timeupdate", () => {

        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;

        if (currentSong.duration) {
            document.querySelector(".circle").style.left =
                (currentSong.currentTime / currentSong.duration) * 100 + "%";
        }

    });

    // Seek
    document.querySelector(".seekbar").addEventListener("click", e => {

        let percent =
            (e.offsetX / e.target.getBoundingClientRect().width) * 100;

        document.querySelector(".circle").style.left = percent + "%";

        currentSong.currentTime =
            (currentSong.duration * percent) / 100;

    });

    // Sidebar
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Previous
    previous.addEventListener("click", () => {

        let currentTrack = decodeURIComponent(
            currentSong.src.split("/").pop()
        );

        let index = songs.indexOf(currentTrack);

        if (index > 0) {
            playMusic(songs[index - 1]);
        }

    });

    // Next
    next.addEventListener("click", () => {

        let currentTrack = decodeURIComponent(
            currentSong.src.split("/").pop()
        );

        let index = songs.indexOf(currentTrack);

        if (index < songs.length - 1) {
            playMusic(songs[index + 1]);
        }

    });

    // Volume
    const volumeSlider = document.querySelector(".range input");

    volumeSlider.addEventListener("input", e => {

        currentSong.volume = e.target.value / 100;

        document.querySelector(".volume>img").src =
            currentSong.volume === 0
                ? "img/mute.svg"
                : "img/volume.svg";

    });

    // Mute
    document.querySelector(".volume>img").addEventListener("click", e => {

        if (currentSong.volume > 0) {

            currentSong.volume = 0;
            volumeSlider.value = 0;
            e.target.src = "img/mute.svg";

        } else {

            currentSong.volume = 0.1;
            volumeSlider.value = 10;
            e.target.src = "img/volume.svg";

        }

    });

}

main();