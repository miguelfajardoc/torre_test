window.addEventListener("load", function(){
    console.log("aqui");

    let text_id = document.getElementById("id_user");
    document.getElementById("b1").addEventListener("click", send);
    function send() {
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
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
            }
        };
        let url = "/id/" + text_id.value;
        xhttp.open("GET", url, true);
        xhttp.send();
    }
});
