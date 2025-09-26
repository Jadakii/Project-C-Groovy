
function toggleDropdown() {
    document.querySelector('.dropdown-menu').classList.toggle('show');
}
let currentAudio = null;

function playPreview(audioSrc) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; 
    }

    currentAudio = new Audio(audioSrc);
    currentAudio.currentTime = 0; 
    currentAudio.play();

    setTimeout(() => {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }, 10000);
}



let bestSellerIndex = 0;
let bestSellerItems, bestSellerCarousel;
let bestSellerVisible = 3; 

function updateBestSellerCarousel() {
    const isMobile = window.innerWidth <= 800;
    if (isMobile) {
        bestSellerCarousel.style.transform = `translateX(-${bestSellerIndex * 100}%)`;
    } else {
        const maxIndex = bestSellerItems.length - bestSellerVisible;
        if (bestSellerIndex > maxIndex) bestSellerIndex = 0;
        if (bestSellerIndex < 0) bestSellerIndex = maxIndex;
        bestSellerCarousel.style.transform = `translateX(-${bestSellerIndex * 33.3333}%)`;
    }
}

function nextBestSeller() {
    const isMobile = window.innerWidth <= 800;
    if (isMobile) {
        bestSellerIndex = (bestSellerIndex + 1) % bestSellerItems.length;
    } else {
        const maxIndex = bestSellerItems.length - bestSellerVisible;
        bestSellerIndex++;
        if (bestSellerIndex > maxIndex) bestSellerIndex = 0;
    }
    updateBestSellerCarousel();
}

function prevBestSeller() {
    const isMobile = window.innerWidth <= 800;
    if (isMobile) {
        bestSellerIndex = (bestSellerIndex - 1 + bestSellerItems.length) % bestSellerItems.length;
    } else {
        const maxIndex = bestSellerItems.length - bestSellerVisible;
        bestSellerIndex--;
        if (bestSellerIndex < 0) bestSellerIndex = maxIndex;
    }
    updateBestSellerCarousel();
}

let recIndex = 0;
let recItems;
function showRecommendation(idx) {
    recItems.forEach((el, i) => {
        el.classList.toggle('active', i === idx);
    });
}
function nextRecommendation() {
    recIndex = (recIndex + 1) % recItems.length;
    showRecommendation(recIndex);
}

let bestSellerInterval = null;
let recommendationInterval = null;

function startBestSellerAutoSlide() {
    stopBestSellerAutoSlide();
    if(window.innerWidth <= 800) {
        bestSellerInterval = setInterval(() => {
            nextBestSeller();
        }, 3500);
    }
}
function stopBestSellerAutoSlide() {
    if(bestSellerInterval) clearInterval(bestSellerInterval);
    bestSellerInterval = null;
}

function startRecommendationAutoSlide() {
    stopRecommendationAutoSlide();
    recommendationInterval = setInterval(() => {
        nextRecommendation();
    }, 3500);
}
function stopRecommendationAutoSlide() {
    if(recommendationInterval) clearInterval(recommendationInterval);
    recommendationInterval = null;
}
document.addEventListener('DOMContentLoaded', () => {
    bestSellerCarousel = document.querySelector('.best-seller-carousel');
    bestSellerItems = document.querySelectorAll('.best-seller-carousel .song-item');
    recItems = document.querySelectorAll('.song-slider .slide');
    updateBestSellerCarousel();
    showRecommendation(recIndex);

    startBestSellerAutoSlide();
    startRecommendationAutoSlide();
});

window.addEventListener('resize', () => {
    updateBestSellerCarousel();
    showRecommendation(recIndex);
    startBestSellerAutoSlide();
});

