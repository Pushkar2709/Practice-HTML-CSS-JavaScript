var text = "pushkar maheshwari";
var x = 3;
var textElement = document.getElementById("text");
textElement.innerHTML = text;

function hack() {
    var count = 0, n = text.length;
    var interval = setInterval(() => {
        var newText = text.split("");
        for (var i=count;i<x*n;i++) {
            newText[Math.floor(i/x)] = String.fromCharCode(Math.floor(Math.random()*26) + 65);
        }
        textElement.innerHTML = newText.join("");
        count++;
        if (count > x*n)
        window.clearInterval(interval);
    }, 30);
}


textElement.addEventListener("mouseover", hack);
