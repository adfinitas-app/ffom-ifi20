var images = new Array();

function preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image();
		images[i].src = preload.arguments[i];
	}
}
preload(
	"../assets/img/header-bg-france.png",
	"../assets/img/header-bg-syrie.png",
	"../assets/img/header-bg-palestine.png"
);