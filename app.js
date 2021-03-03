
import animateControls from "./lib/animation.js";
import youtube from "./lib/youtube.js";
import renderScene from "./lib/3d.js";

document.addEventListener("DOMContentLoaded", () => {
    
    // Load youtube iframe
    youtube();

    // Set up animation of input element and help section
    animateControls();

    // init three.js
    renderScene();
});