import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js"

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const loader = new GLTFLoader();
let camera;

export default function init() {
	const container = document.querySelector(".scene");

	// Renderer setup
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	// Loader setup
	loader.load("../3d/scenev2.glb", function (gltf) {
		scene.add(gltf.scene);
		camera = gltf.cameras[0];
		render();
	});
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}