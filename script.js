const night = 1;
const selectSound = new Audio("./audio/Blip.mp3");
selectSound.loop = false;
const music = new Audio("./audio/Main Menu theme.mp3");
music.loop = true;
music.play();

const options = Object.values(document.querySelectorAll("li"));
let currentOption = 0;
for (const li of options) {
    li.onmouseout = e => {
        e.target.classList.remove("hovered");
    }
    li.onmouseenter = e => {
        e.target.classList.add("hovered");
        currentOption = options.indexOf(e.target);
        selectSound.play();
    }
}

document.onkeydown = e => {
    if (document.querySelector("#menu").matches(".invisible")) return;
    if (["ArrowUp", "ArrowDown", "Tab"].includes(e.key)) {
        options[currentOption].classList.remove("hovered");
    } else if (e.key != "Enter") return

    switch (e.key) {
        case "ArrowUp": currentOption -= 2;
        case "ArrowDown": currentOption++;
        case "Tab":
            e.preventDefault();
            if (currentOption > options.length-1) {
                currentOption = 0;
            } else if (currentOption < 0) {
                currentOption = options.length-1;
            } else if (e.key == "Tab") {
                if (currentOption > options.length-2) {
                    currentOption = 0;
                } else {
                    currentOption++;
                }
            }
            options[currentOption].classList.add("hovered");
            selectSound.play();
            break;
        case "Enter":
            if (options[currentOption].innerHTML === "New Game") {
                options[currentOption].classList.remove("hovered");
                startGame();
            }
            break;
    }
}

async function startGame() {
    selectSound.play();
    music.pause();
    music.currentTime = 0;
    document.querySelector("#menu").classList.add("invisible");
    
    const startScreen = document.querySelector("#start-screen");
    const heading = document.querySelector("#start-screen > h2");

    // Set suffix based on night number
    const nightStr = night.toString();
    let suffix = "";
    switch (nightStr.substring(nightStr.length-1, nightStr.length)) {
        case "1":
            suffix = "st";
            break;
        case "2":
            suffix = "nd";
            break;
        case "3":
            suffix = "rd";
            break;
        default:
            suffix = "th";
    }
    heading.innerHTML = `12:00 AM<br>${night + suffix} Night`;

    // Fade in/out night start title card
    startScreen.classList.remove("invisible");
    const fadeOut = new Promise(resolve => {
        setTimeout(() => {
            heading.classList.add("fading");
            heading.addEventListener("transitionend", transitionEnd);
            function transitionEnd() {
                startScreen.classList.add("invisible");
                heading.removeEventListener("transitionend", transitionEnd);
                resolve();
            }
        }, 2500);
    });
    await fadeOut;
}