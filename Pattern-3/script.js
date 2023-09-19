const left = document.getElementById("leftSide");

const handleOnMove = e => {
    const w = e.clientX / window.innerWidth * 100;
    left.style.width = `${w}%`;
}

document.onmousemove = e => handleOnMove(e);