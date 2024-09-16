function redirectToLink() {
    window.location.href = "https://wa.me/+6285714129261";
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

// Mendapatkan elemen modal dan konten dalam modal
var modal = document.getElementById("feedbackModal");
var modalMessage = document.querySelector(".modal-message");
var closeModal = document.querySelector(".close");

// Fungsi untuk menampilkan modal
function showModal(message, type) {
    modalMessage.textContent = message;
    modalMessage.classList.add(type);
    modal.style.display = "block";
}

// Fungsi untuk menutup modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Menutup modal jika pengguna mengklik di luar modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Mengecek apakah ada pesan feedback dari PHP
if (feedbackMessage) {
    // Menentukan tipe pesan (success atau error) berdasarkan isi pesan
    var messageType = feedbackMessage.includes("berhasil") ? "success" : "error";
    
    // Menampilkan modal dengan pesan
    showModal(feedbackMessage, messageType);
}

window.addEventListener('scroll', function() {
    updateActiveLink();
});

// Jalankan saat halaman pertama kali dimuat
window.addEventListener('DOMContentLoaded', function() {
    updateActiveLink();
});

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.list a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });

    // Jika tidak ada section yang terdeteksi (halaman di posisi paling atas), aktifkan About secara default
    if (currentSection === '') {
        document.querySelector('.list a[href="#about"]').classList.add('active');
    }
}
