window.addEventListener("load", function(){
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");
    context.fillStyle = "red";
    context.fillRect(10, 10, 100, 50);

    let id = document.getElementById("id_user");
    document.getElementById("b1").addEventListener("click", conections);
    function conections() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
	    if (this.readyState == 4 && this.status == 200) {
		console.log("response" + this.responseText);
	    }
	};
	let url = "/conections/" + id.value;
	xhttp.open("GET", url, true);
	xhttp.send();
    }

});
