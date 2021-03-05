import anime from "https://unpkg.com/animejs@3.2.1/lib/anime.es.js"

var timer = 0;
var timerStarted = false;
var interval;


/**
 * Registers the event listeners, 
 */
function animateControls() {
    document.addEventListener("mousemove", () => {
        timer = 0;
        if (!timerStarted) {
            timerStarted = true;
            anime({
                targets: "main :not(#player)",
                opacity: "100%",
                duration: 400,
                easing: "linear"
            });
            interval = setInterval(shouldFade, 1000);
        }
    });
}

function hideUI() {
    clearTimeout(interval);
    timer = setTimeout(() => {
        anime({
            target: "main :not(#player)",
            opacity: 0,
            duration: 400,
            easing: "linear"
        }, 2000);
        document.removeEventListener("mousemove", hideUI);
        document.addEventListener("mousemove", showUI);
    })
}

function showUI() {
    document.removeEventListener("mousemove", showUI);

    anime({
        targets: "main :not(#player)",
        opacity: "100%",
        duration: 400,
        easing: "linear",
        complete: () => document.addEventListener("mousemove", hideUI)
    });
}

function shouldFade() {
    if (timer === 2) {
        timerStarted = false;
        clearInterval(interval);
        anime({
            targets: "main :not(#player)",
            opacity: "0",
            duration: 400,
            easing: "linear"
        });
    }
    timer++;
}
export default animateControls