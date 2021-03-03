import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js"

export default function init() {
	const container = document.querySelector(".scene");
	let scene = new THREE.Scene();

	const fov = 120;
	const aspect = container.clientWidth / container.clientHeight;
	const near = 0.1;
	const far = 500;

	// Camera setup
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 0, 0);

	// Renderer setup
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	// Loader setup
	const loader = new GLTFLoader();
	loader.load("../3d/tv.glb", function (gltf) {
		scene.add(gltf.scene);
		console.log(scene);
		renderer.render(scene, camera);
	});
}