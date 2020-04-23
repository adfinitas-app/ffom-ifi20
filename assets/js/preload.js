var images = new Array();

function preload(array) {
	for (var i = 0; i < array.length; i++) {
		images[i] = new Image();
		images[i].src = array[i];
	}
}
preload([
	"../assets/img/header-bg-france.png",
	"../assets/img/header-bg-syrie.png",
	"../assets/img/header-bg-palestine.png",
	"../assets/img/header-bg.png",
	"../assets/img/circle-ifi.png",
	"../assets/img/circle-ir.png",
	"../assets/img/circle-is.png",
]);
