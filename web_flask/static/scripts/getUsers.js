window.addEventListener("load", function(){

    let key = document.getElementById("key_user");
    document.getElementById("b2").addEventListener("click", search);

    function search() {
	let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
	    let consult = document.getElementById("consult_key");
            if (this.readyState == 4 && this.status == 200) {
		let response = JSON.parse(this.responseText);

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
		    for(j = 0; j < li.length; j++) {
			console.log("adding listener");
			li[j].addEventListener("click", function (){
			    document.getElementById("id_user").value = this.lastElementChild.innerHTML;
			    document.getElementById("b1").click();
			});
		    }
		};
		if (consult.lastElementChild.localName == "span") {
		    consult.removeChild(consult.lastElementChild);
		}
	    }
	    else if (this.readyState == 4 && this.status == 404) {
		if (consult.lastElementChild.localName == "span") {
		    consult.removeChild(consult.lastElementChild);
		}
		console.log("Id not found");
		new_node = document.createElement("span");
		new_node.className = "small";
		new_node.textContent = "Not people found, please try again";
		consult.appendChild(new_node);
	    }
	};
	let url = "/key/" + key.value;
	xhttp.open("GET", url, true);
	xhttp.send();
    }
});
