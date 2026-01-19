// ===== Лоадер =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000); // совпадает с длительностью анимации fade-out
  }, 2000);
});

// ===== Слайдер =====
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let index = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : slides.length - 1;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    index = (index < slides.length - 1) ? index + 1 : 0;
    updateSlider();
  });

  // Опционально: перелистывание стрелками клавиатуры
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
});


// === КОСМИЧЕСКИЙ ФОН НА CANVAS ===
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Массив звёзд
const stars = [];
const starsCount = 280; // можно менять 200–400

for (let i = 0; i < starsCount; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2.5 + 0.5,        // от 0.5 до 3px
    speedX: Math.random() * 0.5 - 0.25,     // от -0.25 до +0.25
    speedY: Math.random() * 0.5 - 0.25,
    opacity: Math.random() * 0.6 + 0.4,     // от 0.4 до 1
    twinkleSpeed: Math.random() * 0.03 + 0.01
  });
}

let twinklePhase = 0;

function animateStars() {
  ctx.clearRect(0, 0, width, height);

  twinklePhase += 0.01;

  stars.forEach(star => {
    // Плавное движение
    star.x += star.speedX;
    star.y += star.speedY;

    // Зацикливание по краям экрана
    if (star.x < 0) star.x = width;
    if (star.x > width) star.x = 0;
    if (star.y < 0) star.y = height;
    if (star.y > height) star.y = 0;

    // Лёгкое мерцание
    const twinkle = Math.sin(twinklePhase * star.twinkleSpeed) * 0.3 + 0.7;
    const opacity = star.opacity * twinkle;

    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

animateStars();