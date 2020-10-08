    var modal2 = document.getElementById("tvesModal2");
    var btn2 = document.getElementById("btnModal");
    var span2 = document.getElementsByClassName("close2")[0];
    var body2 = document.getElementsByTagName("body")[0];

    btn2.onclick = function() {
        modal2.style.display = "block";

        body2.style.position = "static";
        body2.style.height = "100%";
        body2.style.overflow = "hidden";
        console.log("raa")
    }

    span2.onclick = function() {
        modal2.style.display = "none";

        body2.style.position = "inherit";
        body2.style.height = "auto";
        body2.style.overflow = "visible";
    }

    window.onclick = function(event) {
        if (event.target == modal2) {
            modal2.style.display = "none";

            body2.style.position = "inherit";
            body2.style.height = "auto";
            body2.style.overflow = "visible";
        }
    }
