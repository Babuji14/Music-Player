document.addEventListener("DOMContentLoaded", function() { 
    const progress = document.querySelector("#progress");
    const song = document.querySelector("#song");
    const pause = document.querySelector("#pause i");
    const img = document.querySelector(".singer-img");
    const singerName = document.querySelector(".singer-name");
    const songName = document.querySelector(".song-name");

    // Array of songs with their details
    const songs = [
        {
            src: "Oru-Naali.mp3",
            img: "/yuvan.jpg",
            songTitle: "Oru Naali",
            singer: "Yuvan Shankar Raja"
        },
        {
            src: "Hukum.mp3",
            img: "/anirudh.jpg",
            songTitle: "Hukum",
            singer: "Anirudh"
        },
        {
            src: "Moongil-Thottam.mp3",
            img: "/ar.jfif",
            songTitle: "Moongil Thottam",
            singer: "A R Rahaman"
        },
        {
            src: "Thendral Vanthu.mp3",
            img: "/illayaraaja.jfif",
            songTitle: "Thendral vandthu",
            singer: "Illayaraaja"
        },
        {
            src: "Nee-Kavithaigala.mp3",
            img: "/pradeep.jfif",
            songTitle: "Nee kavithaigala",
            singer: "N Pradeep Kumar"
        }
    ];

    let currentSongIndex = 0;

    // Function to load the song and update metadata
    function loadSong(index) {
        const songData = songs[index];
        song.src = songData.src;
        img.src = songData.img;
        songName.textContent = songData.songTitle;
        singerName.textContent = songData.singer;
        song.load();
    }

    song.onloadedmetadata = function() {
        progress.max = song.duration;
        progress.value = song.currentTime;
    };

    function updateProgress() {
        progress.value = song.currentTime;
         updateCurrentTimeDisplay();
    }

    function playpause() {
        if (!song.paused) {
            song.pause();
            pause.classList.remove("fa-pause");
            pause.classList.add("fa-play");
        } else {
            song.play();
            pause.classList.remove("fa-play");
            pause.classList.add("fa-pause");
        }
    }

    song.addEventListener('play', () => {
        pause.classList.remove("fa-play");
        pause.classList.add("fa-pause");
        setInterval(updateProgress, 500);
    });

    song.addEventListener('pause', () => {
        pause.classList.remove("fa-pause");
        pause.classList.add("fa-play");
    });

    progress.addEventListener('input', function() {
        song.currentTime = progress.value;
    });

    progress.addEventListener('change', function() {
        song.play();
    });

    // Function to go to the next song
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        song.play();
    }

    song.addEventListener('ended', nextSong);
    // Attach nextSong to the forward button
    document.querySelector('.fa-forward').addEventListener('click', nextSong);

    // Load the first song initially
    loadSong(currentSongIndex);
    window.playpause = playpause;
    function updateCurrentTimeDisplay() {
        const minutes = Math.floor(song.currentTime / 60);
        const seconds = Math.floor(song.currentTime % 60).toString().padStart(2, '0');
        currentTimeDisplay.textContent = `Current Time: ${minutes}:${seconds}`;
    }

    // Function to toggle loop on the song
    function toggleLoop() {
        song.loop = !song.loop;  // Toggle loop on/off
        loopBtn.textContent = song.loop ? "Looping On" : "Looping Off";  // Update button text
    }

    // Attach event listener to the loop button
    loopBtn.addEventListener('click', toggleLoop);

    // Automatically play the next song when the current one ends
    song.addEventListener('ended', function() {
        if (!song.loop) {  // If not looping, go to the next song
            nextSong();
        }
    });
});
