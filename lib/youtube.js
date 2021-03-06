
/**
 * This module instantiates the youtube player and
 * forwards the hotkeys for the various youtube player
 * functionality
 */
function youtube() {
    const form = document.querySelector("form");
    const input = form.querySelector("input");

    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    const player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: '_O01K8sNeDo',
        events: {
            'onReady': onPlayerReady
        }
    });
    const video = document.querySelector("iframe");
    //       &controls=0 => hides the bottom row of controls
    //            &rel=0 => only shows videos of same channel on pause
    // &modestbranding=1 => hides the youtube logo in controls
    video.src += "&rel=0&modestbranding=1";

    form.addEventListener("submit", event => {
        event.preventDefault();
        // video.src = changeVideo(video.src, input.value);
        player.cueVideoById(getId(input.value))
        player.playVideo();
    });

    input.addEventListener("keydown", event => {
        let key = event.key.toLowerCase();

        if (key == "enter") {
            player.cueVideoById(getId(input.value));
        }
    });

    document.addEventListener("keydown", event => {
        // event.preventDefault();
        let key = event.key.toLowerCase();
        // Handle all inputs and call the corresponding
        // youtube video functionality
        // example: m -> mute, space -> pause/play

        if (key === "m") {
            player.isMuted() ? player.unMute() : player.mute();
        }
        else if (key === " ") {
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        }
    });

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }
}

export default youtube