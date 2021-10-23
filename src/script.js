import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load( './model/earth2.glb', function ( gltf ) {
    gltf.scene.scale.set(0.3,0.3,0.3)
	scene.add( gltf.scene );
    gui.add(gltf.scene.rotation, 'x').min(0).max(9);
    gui.add(gltf.scene.rotation, 'y').min(0).max(9);
    gui.add(gltf.scene.rotation, 'z').min(0).max(9);
});


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Add a cube to the scene
const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(-2, 0, -5); // Optional, 0,0,0 is the default
mesh.name = "cubes"
scene.add(mesh);

// Lights

const pointLight = new THREE.AmbientLight(0xffffff, 5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 5, 0); // x, y, z
scene.add(dirLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // gltf.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

//interactions

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

function onMouseMove(event) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  var tooltip = document.getElementById('tooltip');
  if (intersects[0]) {
    if (intersects[0].object) {
      console.log(intersects[0].object.name)
      tooltip.innerHTML = intersects[0].object.name;
      tooltip.style.visibility = 'visible';
      tooltip.style.top = event.clientY + 'px';
      tooltip.style.left = event.clientX + 20 + 'px';
    } else {
      tooltip.style.visibility = 'hidden';
    }
  } else {
    tooltip.style.visibility = 'hidden';
  }
}

window.addEventListener( 'mousemove', onMouseMove );


