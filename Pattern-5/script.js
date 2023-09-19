const scopeElement = document.getElementById("scope");

document.onpointermove = (event) => {
    const {clientX, clientY} = event;

    scopeElement.style.left = `${clientX}px`;
    scopeElement.style.top = `${clientY}px`;
}