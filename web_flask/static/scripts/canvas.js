window.addEventListener("load", function(){
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");


    let id = document.getElementById("id_user");
    document.getElementById("b1").addEventListener("click", conections);
    function conections() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
	    if (this.readyState == 4 && this.status == 200) {
		distance = 180;
		response = JSON.parse(this.responseText);
		console.log("response" + response);
		principal = response[0];
		secondary = response[1];
		console.log("me" + id.value);
		console.log(principal[id.value]);
		for (const [key, value] of Object.entries(principal)) {
			value.posx = ((value.posx * distance) + 500);
		    	value.posy = ((value.posy * distance) + 250);
			console.log(key)
			console.log(value)
			draw(value);
		}
	    }
	};
	let url = "/conections/" + id.value;
	xhttp.open("GET", url, true);
	xhttp.send();
	//function that recieve the data and draw the picture in a canvas
	function draw(data)
	{
	    let scale = 0.2
	    let img = new Image;
	    console.log(img);
	    console.log(img.width);
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
