document.getElementById('gmail_button').addEventListener('click', function() {
    const gmailInput = document.getElementById('gmail_input').value;
    const gmailResult = document.getElementById('gmail_result');
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (gmailRegex.test(gmailInput)) {
        gmailResult.textContent = "Правильный Gmail.";
        gmailResult.style.color = "green";
    } else {
        gmailResult.textContent = "Неправильны Gmail. Введите снова.";
        gmailResult.style.color = "red";
    }
});


const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let positionX = 0,
    positionY = 0;

const offsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const offsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

let direction = "right";

const moveBlock = () => {
    if (direction === "right") {
        if (positionX < offsetWidth) {
            positionX++;
            childBlock.style.left = `${positionX}px`;
            requestAnimationFrame(moveBlock);
        } else {
            direction = "down";
            requestAnimationFrame(moveBlock);
        }
    } else if (direction === "down") {
        if (positionY < offsetHeight) {
            positionY++;
            childBlock.style.top = `${positionY}px`;
            requestAnimationFrame(moveBlock);
        } else {
            direction = "left";
            requestAnimationFrame(moveBlock);
        }
    } else if (direction === "left") {
        if (positionX > 0) {
            positionX--;
            childBlock.style.left = `${positionX}px`;
            requestAnimationFrame(moveBlock);
        } else {
            direction = "up";
            requestAnimationFrame(moveBlock);
        }
    } else if (direction === "up") {
        if (positionY > 0) {
            positionY--;
            childBlock.style.top = `${positionY}px`;
            requestAnimationFrame(moveBlock);
        } else {
            direction = "right";
            requestAnimationFrame(moveBlock);
        }
    }
};

moveBlock();


const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let seconds = 0;
let interval = null;

function startTimer() {
    if (!interval) {
        interval = setInterval(() => {
            seconds++;
            secondsDisplay.textContent = seconds;
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    secondsDisplay.textContent = seconds;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("../data/characters.json", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const characters = await response.json();
        displayCharacters(characters);
    } catch (error) {
        console.error("Error fetching characters:", error);
    }

    function displayCharacters(characters) {
        const charactersList = document.querySelector(".characters-list");

        characters.forEach((character) => {
            const card = document.createElement("div");
            card.classList.add("character-card");

            const photo = document.createElement("div");
            photo.classList.add("character-photo");
            const img = document.createElement("img");
            img.src = character.person_photo;
            img.alt = character.name;
            photo.appendChild(img);

            const name = document.createElement("h3");
            name.textContent = character.name;

            const description = document.createElement("p");
            description.textContent = character.description;

            card.appendChild(photo);
            card.appendChild(name);
            card.appendChild(description);

            charactersList.appendChild(card);
        });
    }
});


async function anyInfo() {
    try {
        const response = await fetch("../data/any.json", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const any = await response.json();
        console.log(any);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

anyInfo();
