var titleBoxElement = document.getElementById("title-box");
var shownElement = document.getElementById("shown");
var hiddenElement = document.getElementById("hidden");

titleBoxElement.addEventListener("mouseenter", () => {
    shownElement.animate({
        transform : "scaleY(0)"
    }, {
        duration: 100, 
        fill: "forwards"
    })
    hiddenElement.animate({
        transform: "scaleY(1)"
    }, {
        duration: 100, 
        fill: "forwards"
    })
})

titleBoxElement.addEventListener("mouseleave", () => {
    shownElement.animate({
        transform : "scaleY(1)"
    }, {
        duration: 100, 
        fill: "forwards"
    })
    hiddenElement.animate({
        transform: "scaleY(0)"
    }, {
        duration: 100, 
        fill: "forwards"
    })
})