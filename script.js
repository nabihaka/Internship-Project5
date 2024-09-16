function redirectToLink() {
    window.location.href = "https://wa.me/+6285640008464";
}

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 0,
    centered: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const apiKey = '5fc69caa0771ec2512584f5715235ee1';
const cityId = '1625812';
const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric`;
fetch(apiUrl)
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = '';
    const forecastList = data.list.slice(0, 1);
    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleString();
        const temp = forecast.main.temp;
        const description = forecast.weather[0].description;
        const forecastElement = document.createElement('p');
        forecastElement.textContent = `${date}: ${temp}°C - ${description}`;
        weatherDiv.appendChild(forecastElement);
    });
})
.catch(error => {
    console.error('Error fetching weather data:', error);
    document.getElementById('weather').innerText = 'Error loading weather data. Please try again later.';
});
