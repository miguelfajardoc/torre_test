window.addEventListener("load", function(){
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");

    let id = document.getElementById("id_user");
    document.getElementById("b1").addEventListener("click", conections);
    let consult = document.getElementById("consult_id");
    function conections() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {

	    if (this.readyState == 4 && this.status == 200) {
		distance = 180;
		response = JSON.parse(this.responseText);
		principal = response[0];
		secondary = response[1];
		for (const [key, value] of Object.entries(principal)) {
			value.posx = ((value.posx * distance) + 500);
		    	value.posy = ((value.posy * distance) + 250);
			draw(value);
		}
		document.getElementById("wait").innerHTML = "";
	    }
	    else if (this.readyState == 4 && this.status == 404) {
		if (consult.lastElementChild.localName == "span") {
		    consult.removeChild(consult.lastElementChild);
		}
		document.getElementById("wait").innerHTML = "";
		console.log("Id not found");
		new_node = document.createElement("span");
		new_node.className = "small";
		new_node.textContent = "Id not found, please try again";
		consult.appendChild(new_node);
	    }

	};
	let url = "/conections/" + id.value;
	if (consult.lastElementChild.localName == "span") {
		    consult.removeChild(consult.lastElementChild);
		}
	document.getElementById("wait").innerHTML = "Loading conections....";
	xhttp.open("GET", url, true);
	xhttp.send();
	//function that recieve the data and draw the picture in the canvas
	function draw(data)
	{
	    let scale = 0.2
	    let img = new Image;
	    img.onload = function(){
		context.drawImage(img, data.posx - (this.width * scale/2)
				  , data.posy - (this.height * scale/2),
				  this.width * scale, this.height  *
				  scale);
	    };
	    img.src = data.img;

	}
    }

});
