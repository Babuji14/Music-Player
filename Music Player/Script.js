document.addEventListener("DOMContentLoaded", function() {
    const progress = document.querySelector("#progress");
    const song = document.querySelector("#song");
    const pause = document.querySelector("#pause i");

    song.onloadedmetadata = function() {
        progress.max = song.duration;
        progress.value = song.currentTime;
    };

    function updateProgress() {
        progress.value = song.currentTime;
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

    window.playpause = playpause;
});
