import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import Movements from './src/movement';
import ethereum from './src/Web3.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//rendering conditions
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//rendered cube
// const geometry_cube = new THREE.BoxGeometry( 1, 1, 1 );
// const material_cube = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry_cube, material_cube );
// scene.add( cube );
// camera.position.z = 5;

//rendered area
const geometry_area = new THREE.BoxGeometry( 50, 0.5, 50 );
const material_area = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const area = new THREE.Mesh( geometry_area, material_area );
scene.add( area );
camera.position.set(-0.2, 5, 41);

//rendered cylinder
// const geometry_cyl = new THREE.CylinderGeometry( 5, 5, 20, 32 ); 
// const material_cyl = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
// const cylinder = new THREE.Mesh( geometry_cyl, material_cyl ); scene.add( cylinder );
// cylinder.position.set(15, 2, 2);

//lighting
const ambient_light = new THREE.AmbientLight(0x432948);
const direction_light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(direction_light);
scene.add(ambient_light);

// Mouse Controller

const controls = new OrbitControls(camera, renderer.domElement);

//Avatar

const nftpic = new THREE.TextureLoader().load('sample.jpeg');

//rendering function
function animate() {
	requestAnimationFrame( animate );
	// cube.rotation.x += 0.03;
	// cube.rotation.y += 0.03;
	// cylinder.rotation.x += 0.03;
	// cylinder.rotation.y += 0.03;
	if(Movements.isPressed(37)){//left
		camera.position.x -= 0.5;
	}
	if(Movements.isPressed(38)){//up
		// camera.position.x += 0.5;
		camera.position.y += 0.5;
	}
	if(Movements.isPressed(39)){//right
		camera.position.x += 0.5;
	}
	if(Movements.isPressed(40)){//down
		// camera.position.x -= 0.5;
		camera.position.y -= 0.5;
	}
	controls.update();
	camera.lookAt(area.position);
	renderer.render( scene, camera );
}

//checking WebGL compatibility
if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}

ethereum.then((result) => {
	result.nft.forEach((Object, index) => {
		if(index <= result.supply){
			// const geometry_cube = new THREE.BoxGeometry( Number(Object.w), Number(Object.h), Number(Object.d));
			// const material_cube = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
			const geometry_cube = new THREE.PlaneGeometry(Number(Object.h), Number(Object.w));
			const material_cube = new THREE.MeshBasicMaterial({ map: nftpic });
			const nft = new THREE.Mesh( geometry_cube, material_cube );
			nft.position.set(Number(Object.x), Number(Object.y), Number(Object.z));
			scene.add( nft );
		}
	})
});