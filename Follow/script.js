const blob = document.getElementById("blob");

document.onmousemove = (e) => {
    const {clientX, clientY} = e;

    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    },  {
        duration: 500, 
        fill: "forwards"
    });
}