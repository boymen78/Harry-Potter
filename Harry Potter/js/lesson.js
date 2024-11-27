// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentIndex = 0;

const hideContent = () => {
    tabContentBlocks.forEach(block => {
        block.style.display = 'none';
    });
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = 'block';
    tabs[id].classList.add('tab_content_item_active');
};

const autoSlide = () => {
    currentIndex = (currentIndex + 1) % tabs.length;
    hideContent();
    showTabContent(currentIndex);
};

hideContent();
showTabContent(currentIndex);

const interval = setInterval(autoSlide, 3000);

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                clearInterval(interval);
                currentIndex = tabIndex;
                hideContent();
                showTabContent(currentIndex);

                setTimeout(() => {
                    setInterval(autoSlide, 3000);
                }, 3000);
            }
        });
    }
};


// CONVERTER

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const eurInput = document.querySelector("#eur");

const fetchConversionRates = async () => {
    try {
        const response = await fetch("../data/converter.json", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching conversion rates:", error);
        return null;
    }
};

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = async () => {
        const data = await fetchConversionRates();
        if (!data) {
            targetElement1.value = "";
            targetElement2.value = "";
            return;
        }

        try {
            const value = parseFloat(element.value);

            if (isNaN(value)) {
                targetElement1.value = "";
                targetElement2.value = "";
                return;
            }

            if (element.id === "som") {
                targetElement1.value = (value / data.usd).toFixed(2);
                targetElement2.value = (value / data.eur).toFixed(2);
            }

            if (element.id === "usd") {
                targetElement1.value = (value * data.usd).toFixed(2);
                targetElement2.value = ((value * data.usd) / data.eur).toFixed(2);
            }

            if (element.id === "eur") {
                targetElement1.value = (value * data.eur).toFixed(2);
                targetElement2.value = ((value * data.eur) / data.usd).toFixed(2);
            }
        } catch (error) {
            console.error("Error during conversion:", error);
            targetElement1.value = "";
            targetElement2.value = "";
        }
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);


const nextButton = document.querySelector("#btn-next");
const prevButton = document.querySelector("#btn-prev");
const cardBlock = document.querySelector(".card");
let cardIndex = 1;

// Функция для получения данных карточки
const fetchCardData = (index) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)
        .then((response) => response.json())
        .then((data) => {
            cardBlock.innerHTML = `
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Completed:</strong> ${data.completed}</p>
                <span><strong>ID:</strong> ${data.id}</span>
            `;
        })
        .catch(() => {
            cardBlock.innerHTML = `<p>Unable to fetch card data.</p>`;
        });
};

fetchCardData(cardIndex);

nextButton.onclick = () => {
    cardIndex = cardIndex < 200 ? cardIndex + 1 : 1;
    fetchCardData(cardIndex);
};

prevButton.onclick = () => {
    cardIndex = cardIndex > 1 ? cardIndex - 1 : 200;
    fetchCardData(cardIndex);
};

fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(() => console.error('Unable to fetch posts data.'));


const searchButton = document.querySelector("#search");
const searchInput = document.querySelector(".cityName");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");

const APP_ID = "e417df62e04d3b1b111abeab19cea714";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

const fetchWeather = async (cityName) => {
    try {
        const response = await fetch(
            `${BASE_URL}?appid=${APP_ID}&q=${cityName}&units=metric&lang=ru`
        );
        if (!response.ok) {
            throw new Error("Не удалось получить данные о погоде.");
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка при получении данных погоды:", error);

        return null;
    }
};

searchButton.onclick = async () => {
    try {
        const data = await fetchWeather(searchInput.value);

        if (!data || data.cod === "404") {
            city.innerHTML = "Город не найден";
            temp.innerHTML = "";
            return;
        }

        city.innerHTML = data.name || "Город не найден";
        temp.innerHTML = `${Math.round(data.main.temp)}°C`;

        const description = data.weather[0].description || "Неизвестно";
        const iconCode = data.weather[0].icon;

        temp.innerHTML += ` ${description} <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="${description}" />`;
    } catch (error) {
        console.error("Ошибка при обновлении погоды:", error);
    }
};