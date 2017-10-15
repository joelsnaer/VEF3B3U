var camera;
var scene;
var renderer;
var mesh;
  
init();
hreyfing();
  
function init() { //Initialize
  
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
  	ljos();
	kubbur();
  
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
  
    window.addEventListener('resize', breyttStaerdAGlugga, false );
    window.addEventListener('click', breytaKubb, false);
  
    render(); //Keyrt render function
}

function kubbur() { //Býr til byrjunar kubb
	//Breytur til að vinna með mesh
	var geometry = new THREE.CubeGeometry( 20, 20, 20);
    var material = new THREE.MeshPhongMaterial( { color: 0xe74c3c, specular: 0x555555, shininess: 30 } );

    //Búið til mesh kubbinn
    mesh = new THREE.Mesh(geometry, material );
    mesh.position.z = -75; //Látt staðsetningu kubbsins á Z ás vera -75 í burtu
    scene.add( mesh );
}

function ljos() { //Býr til ljós
	//And God said, "Let there be light," and there was light.
	var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0.2, 1 ).normalize();
    scene.add(light);
}

function breytaKubb () {
	//Random breytur
	var rand1 = Math.floor(Math.random() * 50) + 1;
	var rand2 = Math.floor(Math.random() * 50) + 1;
	var rand3 = Math.floor(Math.random() * 50) + 1;
	//Litir sem ég vill hafa
	var colors = [0xe74c3c, 0x1abc9c, 0xf1c40f, 0xecf0f1, 0x2ecc71, 0x9b59b6, 0xc0392b, 0xd35400, 0x2c3e50, 0x7f8c8d, 0x3498db];
	var color = colors[Math.floor(Math.random()*colors.length)];

	while(scene.children.length > 0){ //Hreinsar út allt á scene
    	scene.remove(scene.children[0]); 
	}

	//Býr til nýjan kubb með random form
	var geometry = new THREE.CubeGeometry( rand1, rand2, rand3); //Tekið inn random form af kubbinum
    var material = new THREE.MeshPhongMaterial( { color: color, specular: 0x555555, shininess: 30 } ); //Tekið inn random litinn

    mesh = new THREE.Mesh(geometry, material); //Búið til kubbinn eins og random lét hann vera
    mesh.position.z = -75; //Látt staðsetningu kubbsins á Z ás vera -75 í burtu 
    scene.add( mesh ); //Bætt honum við
    ljos(); //Búið til ljós eftir að það hreinsaðist út
}

function hreyfing() { //Animate-ar kasann til að snúast
    mesh.rotation.x += .02;
    mesh.rotation.y += .01;
  
    render(); //Keyrt render function
    requestAnimationFrame( hreyfing );
}
  
function render() {
    renderer.render( scene, camera ); //Renderar scene-ið með camera position
    renderer.setClearColor(0x34495e); //Gefur bakgrunnslit
}
  
function breyttStaerdAGlugga() { //Ef það er breytt stærðinni á glugganum hreyfist cameran með til að kuburinn er enn í miðjunni
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}