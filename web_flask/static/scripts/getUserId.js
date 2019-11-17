window.addEventListener("load", function(){
    console.log("aqui");

    let text_id = document.getElementById("id_user");
    document.getElementById("b1").addEventListener("click", send);
    function send() {
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
	    let consult = document.getElementById("consult_id");
            if (this.readyState == 4 && this.status == 200) {
		let response = JSON.parse(this.responseText)

		name = response.person.name;
		prof_head = response.person.professionalHeadline;
		weight = response.person.weight;
		picture = response.person.picture;

		element = document.getElementById("user_content");

		let child = element.lastElementChild;
		while (child) {
                    element.removeChild(child);
                    child = element.lastElementChild;
		}
		element.innerHTML += "<h1>" + prof_head + "</h1>"
		element.innerHTML += "<img src=" + picture + "></img>"
		element.innerHTML += "<h2>" + name + "</h2>"
		element.innerHTML += "<h2>" + weight + "</h2>"
		window.scrollTo(0, 1000);

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
		new_node.textContent = "Id not found, please try again";
		consult.appendChild(new_node);
	    }
        };
        let url = "/id/" + text_id.value;
        xhttp.open("GET", url, true);
        xhttp.send();
    }
});
