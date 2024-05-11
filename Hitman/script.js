const searchIcon = document.getElementById("search");
const scopeElement = document.getElementById("scope");
const changeElement = document.getElementById("location");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const imgURLs = ["https://images.unsplash.com/photo-1515266591878-f93e32bc5937?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                 "https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=368&q=80",
                 "https://images.unsplash.com/photo-1506773090264-ac0b07293a64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80",
                 "https://images.unsplash.com/photo-1495954380655-01609180eda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                 "https://images.unsplash.com/photo-1516259670444-ad07068e14e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"]
let currImg = 0;

function search() {
    scopeElement.animate({
        backgroundSize: ["120%", "200%", "200%", "120%"],
        backgroundPosition: [ "50% 50%", "30% 20%", "10% 70%", "50% 50%" ]
      }, {
        duration: 5000
    })
}

function changeLocation() {
    console.log(currImg);
    scopeElement.style.backgroundImage = `url(${imgURLs[currImg]})`;
}

searchIcon.addEventListener("click", search);
prevButton.addEventListener("click", () => {
    currImg--;
    if (currImg < 0)
    currImg = imgURLs.length - 1;
    changeLocation();
});
nextButton.addEventListener("click", () => {
    currImg++;
    currImg = currImg%imgURLs.length;
    changeLocation();
})