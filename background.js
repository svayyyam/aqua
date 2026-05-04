import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

let scene, camera, renderer, plane;
let clock = new THREE.Clock();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';

    const geometry = new THREE.PlaneGeometry(20, 20, 128, 128);
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color(0x03091a) }, // Deepest blue
            uColor2: { value: new THREE.Color(0x0a1f45) }, // Highlight blue
        },
        vertexShader: `
            uniform float uTime;
            varying vec2 vUv;
            varying float vElevation;

            void main() {
                vUv = uv;
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
                float elevation = sin(modelPosition.x * 0.5 + uTime * 0.5) * 
                                  sin(modelPosition.y * 0.3 + uTime * 0.4) * 0.5;
                
                modelPosition.z += elevation;
                vElevation = elevation;

                gl_Position = projectionMatrix * viewMatrix * modelPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            varying float vElevation;

            void main() {
                float mixStrength = (vElevation + 0.5) * 0.8;
                vec3 color = mix(uColor1, uColor2, mixStrength);
                gl_FragColor = vec4(color, 0.5);
            }
        `,
        transparent: true
    });

    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    plane.material.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}

init();
animate();
