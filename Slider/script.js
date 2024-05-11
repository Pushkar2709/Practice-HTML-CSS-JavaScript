var imageContainer = document.getElementById("container");
var imageElements = document.getElementsByTagName("img");
var mouseDown = 0;
var lastPerc = 0;
var perc = 0;

window.onmousedown = (e) => {
    mouseDown = e.clientX;
}

window.onmousemove = (e) => {
    if (mouseDown === 0) return;

    perc = lastPerc + 2 * (e.clientX - mouseDown)/window.innerWidth * 100;
    
    if (perc < -100) perc = -100;
    if (perc > 0) perc = 0;

    imageContainer.animate({
        transform: `translateX(${perc}%)`
    }, {
        duration: 2000, 
        fill: "forwards"
    })

    for (var i=0;i<imageElements.length;i++) {
        imageElements[i].animate({
            objectPosition: `${100 + perc}% 50%`
        }, {
            duration: 2000, 
            fill: "forwards"
        })
    }
}

window.onmouseup = (e) => {
    mouseDown = 0;
    lastPerc = perc;
}