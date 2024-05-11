emojis = [
    {
        name: "smile",
        angle: "deg0"
    }, 
    {
        name: "tired", 
        angle: "deg45"
    }, 
    {
        name: "surprise", 
        angle: "deg135"
    },
    {
        name: "smile-wink", 
        angle: "center"
    },
    {
        name: "smile-beam", 
        angle: "deg180"
    },
    {
        name: "sad-cry", 
        angle: "deg225"
    },
    {
        name: "rolling-eyes", 
        angle: "deg315"
    },
]

var circle = document.getElementById("circle");
var description = document.getElementById("description");
var selected;

generateEmojielements();

generateParticles();

function generateParticles() {
    for (var i=0;i<50;i++) {
        var particleElement = document.createElement('div');
        particleElement.classList.add('particle');
        var x = Math.random()*100;
        var y = Math.random()*100;
        // var op = Math.random()/2;
        particleElement.style.transform = `translateX(${x}vh) translateY(${y}vh)`;
        circle.appendChild(particleElement);
        particleElement.animate({
            transform: [`translateX(${x}vh) translateY(${y}vh)`,
             `translateX(${Math.random()*100}vh) translateY(${Math.random()*100}vh)`,
             `translateX(${Math.random()*100}vh) translateY(${Math.random()*100}vh)`, 
             `translateX(${Math.random()*100}vh) translateY(${Math.random()*100}vh)`,  
             `translateX(${x}vh) translateY(${y}vh)`]
            // opacity: [op, 1, op]
        }, {
            duration: 5000, 
            iterations: Infinity
        })
    }
}

function generateEmojielements() {
    emojis.forEach(emoji => {
        var emojiElement = document.createElement("i");
        emojiElement.classList.toggle("fa-regular");
        emojiElement.classList.toggle("fa-face-" + emoji.name);
        emojiElement.classList.toggle(emoji.angle);
        emojiElement.classList.toggle("clickable");
        emojiElement.angle = emoji.angle;
        emojiElement.description = emoji.name;
        if (emoji.angle === "center") {
            emojiElement.classList.toggle("clickable");
            emojiElement.classList.toggle("selected");
            selected = emojiElement;
            description.innerHTML = emoji.name;
        }
    
        emojiElement.addEventListener("click", handleClick);
    
        circle.appendChild(emojiElement);
    });
}


function handleClick() {
    if (this.angle !== "center") {
        this.classList.toggle("selected");
        this.classList.toggle(this.angle);
        this.classList.toggle(selected.angle);
        this.classList.toggle("clickable");
    
        selected.classList.toggle("selected");
        selected.classList.toggle(selected.angle);
        selected.classList.toggle(this.angle);
        selected.classList.toggle("clickable");
    
        var temp = this.angle;
        this.angle = selected.angle;
        selected.angle = temp;
        
        selected = this;
        description.innerHTML = selected.description;
    
        description.animate([
            {
                transform: "translateY(60vh)", 
                opacity: "0"
            }, 
            {
                transform: "translateY(35vh)"
            }
        ], {
            duration: 500, 
            easing: "ease-out"
        })
    }
}