import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let container;
let scene;
let camera;
let renderer;
let controls;

function init() {
    container = document.querySelector("#container");
    scene = new THREE.Scene();
    scene.background = new THREE.Color("skyblue");

    createLights();
    createCamera();
    createRenderer();
    createControls();

    const geometry = new THREE.SphereBufferGeometry(1, 30, 30);
    const material = new THREE.MeshStandardMaterial({ wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.setAnimationLoop(() => {
        update();
        render();
    });
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;
    renderer.physicallyCorrectLights = true;

    container.appendChild(renderer.domElement);
}

function createCamera() {
    camera = new THREE.PerspectiveCamera(
        35,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(2, 1, 5);
}

function createLights() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(5, 5, 10);

    const directionalLightHelper = new THREE.DirectionalLightHelper(
        directionalLight,
        5
    );

    const hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 3);
    const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 5);
    scene.add(
        directionalLight,
        directionalLightHelper,
        hemisphereLight,
        hemisphereLightHelper
    );
}

function createControls() {
    controls = new OrbitControls(camera, renderer.domElement);
}

function update() {

}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;

    // Update camera frustum
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize, false);
init();