// Сцена и камера
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 15;
camera.position.y = 15;
camera.position.z = 0;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0xffffff, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание геометрий осей координат
var axisLength = 5; // Длина осей в единицах

// Геометрия и материал для оси X (красная)
var geometryX = new THREE.BufferGeometry();
var verticesX = new Float32Array([0, 0, 0, axisLength, 0, 0]);
geometryX.addAttribute('position', new THREE.BufferAttribute(verticesX, 3));
var materialX = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 10 }); // Красный цвет

// Геометрия и материал для оси Y (зеленая)
var geometryY = new THREE.BufferGeometry();
var verticesY = new Float32Array([0, 0, 0, 0, axisLength, 0]);
geometryY.addAttribute('position', new THREE.BufferAttribute(verticesY, 3));
var materialY = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 10 }); // Зеленый цвет

// Геометрия и материал для оси Z (синяя)
var geometryZ = new THREE.BufferGeometry();
var verticesZ = new Float32Array([0, 0, 0, 0, 0, axisLength]);
geometryZ.addAttribute('position', new THREE.BufferAttribute(verticesZ, 3));
var materialZ = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 10 }); // Синий цвет

var axisX = new THREE.LineSegments(geometryX, materialX);
var axisY = new THREE.LineSegments(geometryY, materialY);
var axisZ = new THREE.LineSegments(geometryZ, materialZ);

scene.add(axisX);
scene.add(axisY);
scene.add(axisZ);

var fl = true

// Прямоугольник
var posx = 8
var posy = 1
var posz = 3
var den = 1

var m = posx * posy * posz * den
var Ix = m * (posy * posy + posz * posz)/12
var Iy = m * (posx * posx + posz * posz)/12
var Iz = m * (posy * posy + posx * posx)/12
console.log(Ix, Iy, Iz)

//прямоугольник
var material = new THREE.MeshStandardMaterial({ color: 0x00aaff, roughness: 0.5, metalness: 0.5 });
material.shadowSide = THREE.DoubleSide;
var geometry = new THREE.BoxGeometry(posx, posy, posz);
var object = new THREE.Mesh(geometry, material);
scene.add(object);

//Плоскость
const planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xbebebe });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -10
scene.add(plane);

//Рабочий свет
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

//Параметры освещения
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;

//Тени
renderer.shadowMap.enabled = true;
object.castShadow = true;
plane.receiveShadow = true;

// Поворот камеры
const controls = new THREE.OrbitControls(camera, renderer.domElement);

var time = 5000
var dt = 0.01
var isRec = true
var cnt=new function(){
	this.dt = 0.01
	this.den = 1
	this.posx = 8
	this.posy = 1
	this.posz = 3
	this.m = this.posx * this.posy * this.posz * this.den
	this.Ix = this.m * (this.posy * this.posy + this.posz * this.posz)/12
	this.Iy = this.m * (this.posx * this.posx + this.posz * this.posz)/12
	this.Iz = this.m * (this.posy * this.posy + this.posx * this.posx)/12
	this.omegaoldx = 0.00001 
	this.omegaoldy = 0.00001 
	this.omegaoldz = 2
	this.oldlam0 = 1
	this.oldlam1 = 0
	this.oldlam2 = 0
	this.oldlam3 = 0
	this.i = 1
	this.time = 50000
	this.mode = 'rectangle'
	this.b = 0
	this.g = 0
	this.h = 0
	this.pause=function(){fl=false;}
	this.resume=function(){fl=true;}
	this.restart=function(){

		i = cnt.i
		oldlam0 = cnt.oldlam0
		oldlam1 = cnt.oldlam1
		oldlam2 = cnt.oldlam2
		oldlam3 = cnt.oldlam3
		scene.remove(object);

		if (cnt.mode == 'rectangle'){
			if (isRec == false){

			}
			isRec = true
			b = cnt.b
			g = cnt.g
			h = cnt.h
			omegaoldx = cnt.omegaoldx
			omegaoldy = cnt.omegaoldy 
			omegaoldz = cnt.omegaoldz
			m = cnt.m
			Ix = cnt.m * (cnt.posy * cnt.posy + cnt.posz * cnt.posz)/12
			Iy = cnt.m * (cnt.posx * cnt.posx + cnt.posz * cnt.posz)/12
			Iz = cnt.m * (cnt.posy * cnt.posy + cnt.posx * cnt.posx)/12

			material = new THREE.MeshStandardMaterial({ color: 0x00aaff, roughness: 0.5, metalness: 0.5 });
			// material.shadowSide = THREE.DoubleSide;
			geometry = new THREE.BoxGeometry(cnt.posx, cnt.posy, cnt.posz);
			object = new THREE.Mesh(geometry, material);
		}
		if (cnt.mode == "cylinder"){
			isRec = false
			b = 0.0001
			g = 0.1
			h = 0.0001
			den = 1
			rad = 1
			hei = 5
			m = Math.PI * rad * rad * hei * den
			Ix = m * (hei * hei)/12
			Iy = m * rad * rad / 2
			Iz = m * (hei * hei)/12
			console.log(Ix, Iy, Iz)
			omegaoldx = 0.01 * 2 * Math.PI 
			omegaoldy = 1 * 2 * Math.PI  
			omegaoldz = 0.01 * 2 * Math.PI 
			geometry1 = new THREE.CylinderGeometry(rad, rad, hei, 32);
			material = new THREE.MeshBasicMaterial({ color: 0x00aaff});
			material.shadowSide = THREE.DoubleSide;
			material.shininess = 0;
			object = new THREE.Mesh(geometry1, material);
			//линии
			var material1 = new THREE.LineBasicMaterial({ color: 0x000000 }); // Черный цвет
			var topEdges = new THREE.EdgesGeometry(new THREE.CircleGeometry(rad+0.001, 64));
			var topLines = new THREE.LineSegments(topEdges, material1);
			topLines.position.y = (hei+0.01) / 2;
			topLines.rotation.x = Math.PI / 2;
			// Создание границ для нижнего основания
			var bottomEdges = new THREE.EdgesGeometry(new THREE.CircleGeometry(rad+0.001, 64));
			var bottomLines = new THREE.LineSegments(bottomEdges, material1);
			bottomLines.position.y = -(hei+0.01) / 2;
			bottomLines.rotation.x = Math.PI / 2;
			object.add(topLines);
			object.add(bottomLines);
		}
		object.rotation.set(0, 0, 0)
		scene.add(object);
		object.receiveShadow = true;
		object.castShadow = true;
		
	};
};
var gui=new dat.GUI();
gui.add(cnt, 'mode', ['rectangle', 'cylinder']);
gui.add(cnt,'posx',0.001,30);
gui.add(cnt,'posy',0.001,30);
gui.add(cnt,'posz',0.001,30);
gui.add(cnt,'omegaoldx',0.0000001);
gui.add(cnt,'omegaoldy',0.0000001);
gui.add(cnt,'omegaoldz',0.0000001);
// gui.add(cnt, 'Ix').max(40)
// gui.add(cnt, 'Iy').max(40)
// gui.add(cnt, 'Iz').max(40)
gui.add(cnt,'pause');
gui.add(cnt,'resume');
gui.add(cnt,'restart');

animate();

//Иницилизация параметров задачи (Джанибеков вокруг красной оси z для прямоугольника)
var omeganewx
var omeganewy
var omeganewz

var newlam0
var newlam1
var newlam2
var newlam3

var oldlam0 = 1
var oldlam1 = 0
var oldlam2 = 0
var oldlam3 = 0

//НУ для прямоугольника
var omegaoldx = 0.00001 * 2 * Math.PI 
var omegaoldy = 0.00000001 * 2 * Math.PI 
var omegaoldz = 0.3 * 2 * Math.PI

//НУ для цилиндра (вокруг y неустойчиво)
// var omegaoldx = 0.001 * 2 * Math.PI 
// var omegaoldy = 1 * 2 * Math.PI 
// var omegaoldz = 0.001 * 2 * Math.PI

//Параметры Родрига-Гамильтона
var L0 = [1]
var L1 = [0]
var L2 = [0]
var L3 = [0]

var i = 1
// var b = 0.0001
// var g = 0.01
// var h = 0.0001

var b = 0
var g = 0
var h = 0

//Расчет вращения

// Сохранение начальной ориентации объекта
var initialRotation = object.rotation.clone();
var En = 1/2 * omegaoldz * omegaoldz * Iz
function animate() {
	if (i<cnt.time-1 && fl == true){
		// console.log(cnt.mode)
		// console.log(i)
		// 1/2 шага 
		omeganewx = omegaoldx + ((Iy - Iz)/Ix * omegaoldy * omegaoldz - b * omegaoldx) * dt
		omeganewy = omegaoldy + ((Iz - Ix)/Iy * omegaoldx * omegaoldz - g * omegaoldy) * dt
		omeganewz = omegaoldz + ((Ix - Iy)/Iz * omegaoldx * omegaoldy - h * omegaoldz) * dt
	
		newlam0 = oldlam0 + 1/2 * (omeganewx * oldlam3 - omeganewy * oldlam2 + omeganewz * oldlam1) * dt
		newlam1 = oldlam1 + 1/2 * (omeganewy * oldlam3 + omeganewx * oldlam2 - omeganewz * oldlam0) * dt
		newlam2 = oldlam2 + 1/2 * (omeganewz * oldlam3 - omeganewx * oldlam1 + omeganewy * oldlam0) * dt
		newlam3 = oldlam3 - 1/2 * (omeganewx * oldlam0 + omeganewy * oldlam1 + omeganewz * oldlam2) * dt
	
		newlam0 = newlam0 / Math.sqrt(newlam0 * newlam0 + newlam1 * newlam1 + newlam2 * newlam2 + newlam3 * newlam3)
		newlam1 = newlam1 / Math.sqrt(newlam0 * newlam0 + newlam1 * newlam1 + newlam2 * newlam2 + newlam3 * newlam3)
		newlam2 = newlam2 / Math.sqrt(newlam0 * newlam0 + newlam1 * newlam1 + newlam2 * newlam2 + newlam3 * newlam3)
		newlam3 = newlam3 / Math.sqrt(newlam0 * newlam0 + newlam1 * newlam1 + newlam2 * newlam2 + newlam3 * newlam3)
		// console.log(En - 1/2 * (omeganewx * omeganewx * Ix + omeganewy * omeganewy * Iy + omeganewz * omeganewz * Iz) )
		omegaoldx = omeganewx
		omegaoldy = omeganewy
		omegaoldz = omeganewz
	
		oldlam0 = newlam0
		oldlam1 = newlam1
		oldlam2 = newlam2
		oldlam3 = newlam3
		

		//Расчет матрицы поворота
		var matrix = new THREE.Matrix4();
			matrix.set(
			1 - 2 * (newlam1 * newlam1 + newlam2 * newlam2),
			2 * (newlam0 * newlam1 - newlam2 * newlam3),
			2 * (newlam0 * newlam2 + newlam1 * newlam3),
			0,

			2 * (newlam0 * newlam1 + newlam2 * newlam3),
			1 - 2 * (newlam0 * newlam0 + newlam2 * newlam2),
			2 * (newlam1 * newlam2 - newlam0 * newlam3),
			0,

			2 * (newlam0 * newlam2 - newlam1 * newlam3),
			2 * (newlam1 * newlam2 + newlam0 * newlam3),
			1 - 2 * (newlam0 * newlam0 + newlam1 * newlam1),
			0,

			0, 0, 0, 1
		);
		
		//Поворот
		object.rotation.copy(initialRotation);
		object.rotation.setFromRotationMatrix(matrix);

	
		i++
		// console.log(i)
		console.log(Ix, Iy, Iz)
		axisX.rotation.copy(object.rotation);
		axisY.rotation.copy(object.rotation);
		axisZ.rotation.copy(object.rotation);
	}
	console.log(isRec)
	requestAnimationFrame(animate);
  	renderer.render(scene, camera);
}

