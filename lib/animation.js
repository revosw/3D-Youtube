import anime from "https://unpkg.com/animejs@3.2.1/lib/anime.es.js"

var timer = 0;
var timerStarted = false;
var interval;


/**
 * Registers the event listeners, 
 */
function animateControls() {
    console.log("[animateControls] Started");
    document.addEventListener("mousemove", () => {
        timer = 0;
        if (!timerStarted) {
            timerStarted = true;
            console.log("[mousemove] Started timer...");
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
    console.log("[HIDEUI]");
    clearTimeout(interval);
    console.log(`[HIDEUI] PREV ${timer}`);
    timer = setTimeout(() => {
        console.log("[SETTIMEOUT]");
        anime({
            target: "main :not(#player)",
            opacity: 0,
            duration: 400,
            easing: "linear"
        }, 2000);
        document.removeEventListener("mousemove", hideUI);
        document.addEventListener("mousemove", showUI);
    })
    console.log(`[HIDEUI] NEXT ${timer}`);
}

function showUI() {
    console.log("[SHOWUI]");
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
    console.log("[shouldFade] tick " + timer);
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