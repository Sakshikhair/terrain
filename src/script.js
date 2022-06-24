import './style.css'
import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const textureLoader = new THREE.TextureLoader()
const height = textureLoader.load('/textures/h.png')
const texture = textureLoader.load('/textures/texture.jpg')
const alpha = textureLoader.load('/textures/alpha.jpg')


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64)

// Materials
const material = new THREE.MeshStandardMaterial({
    color: 'gray',
    map: texture,
    displacementMap: height,
    displacementScale: .6,
    alphaMap: alpha,
    transparent: true
})

const plane = new THREE.Mesh(geometry, material)
scene.add(plane)
plane.rotation.x = 181
gui.add(plane.rotation, 'x').min(0).max(600)
// Mesh





//Lights
//Light 2
const pointLight2 = new THREE.PointLight(0x1086d9, 3)
pointLight2.position.set(3, 2.5, 1.21)
pointLight2.intensity = 10
scene.add(pointLight2)
const light2 = gui.addFolder('Light 2')
light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelper)

const light2color = {
    color: 0xff0000
}
light2.addColor(light2color, 'color').onChange(() => {
    pointLight2.color.set(light2color.color)
})


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove', animateTerrain)


let mouseY = 0

function animateTerrain(event) {
   
    mouseY = event.clientY
}
const clock = new THREE.Clock()

const tick = () => {
   
    const elapsedTime = clock.getElapsedTime()
    plane.rotation.z = .3* elapsedTime
    plane.material.displacementScale = 0.3 + mouseY*0.0008
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()