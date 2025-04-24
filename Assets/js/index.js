feather.replace();

let currentSlide = 0;
const slides = [document.getElementById('slideScreen1'), document.getElementById('slideScreen2')];
const dots = document.querySelectorAll('.dot');
const navDots = document.getElementById('navDots');
const navArrows = document.getElementById('navArrows');

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function showSlide(index) {
    currentSlide = index;
    updateSlides();
}

function nextSlide() {
    if (currentSlide === 1) {
        window.location.href = './Assets/pages/login.html';
    } else {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
}

window.onload = function() {
    setTimeout(() => {
        document.getElementById('logoScreen').classList.add('hidden');
        document.getElementById('slideScreen1').classList.add('active');
        navDots.classList.add('visible');
        navArrows.classList.add('visible');
    }, 2000);
    
};