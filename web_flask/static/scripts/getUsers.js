window.addEventListener("load", function(){
    console.log("aqui");

    let key = document.getElementById("key_user");
    document.getElementById("b2").addEventListener("click", search);

    function search() {
	let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
		let response = JSON.parse(this.responseText);
		console.log("the response");
		console.log(response);

		let element = document.getElementById("list_names")
		let child = element.lastElementChild;
		while (child) {
                    element.removeChild(child);
                    child = element.lastElementChild;
		}
		for(i = 0; i < response.length; i++) {
		    element.innerHTML += "<li><span> Name:" + response[i].name +
			"</span><span> Id: </span><span>" + response[i].publicId + "</span></li>"
		}
		fill(response);
		function fill(response) {
		    let li = element.querySelectorAll("li");
		    console.log(li);
		    console.log("response");
		    console.log(response);
		    for(j = 0; j < li.length; j++) {
			console.log("adding listener");
			li[j].addEventListener("click", function (){
			    console.log("this " + this.lastElementChild.innerHTML);
			    document.getElementById("id_user").value = this.lastElementChild.innerHTML;
			    document.getElementById("b1").click();
			    console.log("filed and clicked");
			});
		    }
		};
	    };
	};
	let url = "/key/" + key.value;
	xhttp.open("GET", url, true);
	xhttp.send();
    }
});
