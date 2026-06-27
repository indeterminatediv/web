// Core configuration for the proposal experience.
const weddingDate = new Date('2026-12-12T00:00:00');
const pages = Array.from(document.querySelectorAll('.page'));
const themeToggle = document.getElementById('theme-toggle');
const heartsLayer = document.getElementById('hearts');
const petalsLayer = document.getElementById('petals');
const sparklesLayer = document.getElementById('sparkles');
const noBtn = document.getElementById('noBtn');
const letterPopup = document.getElementById('letterPopup');
const typewriter = document.getElementById('typewriter');
let currentPage = 0;
let attemptCount = 0;
let rafId;
let sparkles = [];
let loveBuffer = '';

// Initialize the experience once the DOM is ready.
function init() {
  document.body.classList.add('loading');
  setTimeout(() => {
    document.body.classList.remove('loading');
    document.querySelector('.loading-overlay').classList.add('hidden');
  }, 800);

  setupObservers();
  setupTypewriter();
  setupButtons();
  setupTheme();
  setupFloatingEffects();
  setupCountdown();
  setupCursorEffects();
  setInterval(() => {
    createConfetti(6);
  }, 5000);
}

// Reveal sections as they enter the viewport.
function setupObservers() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.section, .timeline-item').forEach((el) => observer.observe(el));
}

function setupButtons() {
  document.querySelectorAll('[data-next]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = Number(btn.getAttribute('data-next'));
      showPage(target);
    });
  });

  noBtn.addEventListener('mouseenter', moveNoButton);
  noBtn.addEventListener('mousemove', (event) => {
    const rect = noBtn.getBoundingClientRect();
    const distance = Math.hypot(event.clientX - rect.left - rect.width / 2, event.clientY - rect.top - rect.height / 2);
    if (distance < 120) {
      moveNoButton();
    }
  });
  noBtn.addEventListener('click', (event) => {
    event.preventDefault();
    attemptCount += 1;
    if (attemptCount >= 6) {
      celebrate();
      return;
    }
    const phrases = [
      'Maybe...',
      'You\'re making me smile 😊',
      'Almost convinced ❤️',
      'Still trying? 😄',
      'Okay...',
      'Fine...'
    ];
    noBtn.textContent = phrases[attemptCount - 1];
    moveNoButton();
  });
}

function showPage(index) {
  pages.forEach((page) => page.classList.remove('active'));
  pages[index - 1]?.classList.add('active');
  currentPage = index;
}

function nextPage(index) {
  showPage(index);
}

function setupTypewriter() {
  const message = "I don't know what destiny has written. But I know one thing. If we walk together, I will always try my best to make you smile.";
  const heading = document.getElementById('typewriter-heading');
  if (heading) {
    heading.textContent = 'Om ❤️ Deeksha';
  }
  let index = 0;
  typewriter.textContent = '';
  const interval = setInterval(() => {
    typewriter.textContent += message[index];
    index += 1;
    if (index >= message.length) {
      clearInterval(interval);
      const next = document.createElement('button');
      next.className = 'primaryBtn';
      next.textContent = 'Next ❤️';
      next.setAttribute('data-next', '4');
      next.style.marginTop = '18px';
      next.addEventListener('click', () => showPage(4));
      typewriter.insertAdjacentElement('afterend', next);
    }
  }, 36);
}

function setupTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// Create floating hearts and petals using requestAnimationFrame for smooth motion.
function setupFloatingEffects() {
  const createHeart = () => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-6%';
    heart.style.fontSize = (14 + Math.random() * 18) + 'px';
    heart.style.opacity = '0.7';
    heartsLayer.appendChild(heart);
    const drift = 0.4 + Math.random() * 0.8;
    const fall = 1.4 + Math.random() * 1.5;
    const rotate = Math.random() * 360;
    let y = -10;
    let x = Math.random() * 8 - 4;
    const start = performance.now();
    const animate = (now) => {
      const progress = (now - start) / 1000;
      const currentY = progress * 150 * fall;
      const currentX = Math.sin(progress * 1.2) * 36 * drift;
      heart.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate + progress * 40}deg)`;
      heart.style.opacity = Math.max(0, 1 - progress * 0.4);
      if (progress < 2.4) {
        rafId = requestAnimationFrame(animate);
      } else {
        heart.remove();
      }
    };
    rafId = requestAnimationFrame(animate);
  };

  const createPetal = () => {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.innerHTML = '✿';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = '-4%';
    petal.style.fontSize = (10 + Math.random() * 10) + 'px';
    petalsLayer.appendChild(petal);
    const drift = 1 + Math.random() * 1.2;
    let x = 0;
    const offset = Math.random() * 220 - 110;
    const start = performance.now();
    const animate = (now) => {
      const progress = (now - start) / 1000;
      const currentY = progress * 110;
      const currentX = offset + Math.sin(progress * 0.9) * 60 * drift;
      petal.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${progress * 120}deg)`;
      petal.style.opacity = Math.max(0, 1 - progress * 0.24);
      if (progress < 3.2) {
        rafId = requestAnimationFrame(animate);
      } else {
        petal.remove();
      }
    };
    rafId = requestAnimationFrame(animate);
  };

  setInterval(createHeart, 900);
  setInterval(createPetal, 400);
}

function moveNoButton() {
  const x = Math.random() * (window.innerWidth - 180);
  const y = Math.random() * (window.innerHeight - 60);
  noBtn.style.position = 'fixed';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = 'translate(0, 0)';
}

function celebrate() {
  document.querySelectorAll('.page').forEach((page) => page.classList.remove('active'));
  document.getElementById('celebration').classList.add('active');
  createConfetti(300);
  launchFireworks();
  createFloatingHearts();
  createBalloons();
  document.body.classList.add('celebrated');
}

function createConfetti(count) {
  if (window.confetti) {
    window.confetti({
      particleCount: count,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff7aa2', '#ffb6c1', '#f7d6e0', '#c77cff']
    });
  }
}

function launchFireworks() {
  const count = 18;
  for (let i = 0; i < count; i += 1) {
    setTimeout(() => {
      if (window.confetti) {
        window.confetti({
          particleCount: 60,
          spread: 120,
          origin: { x: Math.random(), y: Math.random() * 0.6 },
          colors: ['#ff7aa2', '#ffd7e0', '#ffffff', '#c77cff']
        });
      }
    }, i * 90);
  }
}

function createFloatingHearts() {
  for (let i = 0; i < 24; i += 1) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.fontSize = (18 + Math.random() * 24) + 'px';
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 4000 + i * 120);
  }
}

function createBalloons() {
  for (let i = 0; i < 12; i += 1) {
    const balloon = document.createElement('div');
    balloon.className = 'heart';
    balloon.innerHTML = '🎈';
    balloon.style.left = Math.random() * 100 + '%';
    balloon.style.top = '110%';
    balloon.style.fontSize = (18 + Math.random() * 20) + 'px';
    heartsLayer.appendChild(balloon);
    setTimeout(() => balloon.remove(), 6000 + i * 200);
    const animation = balloon.animate(
      [
        { transform: `translateY(0) rotate(0deg)`, opacity: 0.7 },
        { transform: `translateY(-120vh) rotate(${Math.random() * 240 - 120}deg)`, opacity: 1 }
      ],
      { duration: 5000 + Math.random() * 1800, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
    animation.onfinish = () => balloon.remove();
  }
}

function showLetter() {
  letterPopup.classList.add('show');
}

function closeLetter() {
  letterPopup.classList.remove('show');
}

function setupCountdown() {
  const label = document.getElementById('countdown');
  const timer = () => {
    const now = new Date();
    const diff = weddingDate - now;
    if (diff <= 0) {
      label.innerHTML = '<div class="countdown-card"><strong>Forever</strong><span>Our story begins</span></div>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  };

  timer();
  setInterval(timer, 1000);
}

function setupCursorEffects() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-sparkle';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.style.background = 'rgba(255,255,255,0.8)';

    if (Math.random() > 0.86) {
      const trail = document.createElement('div');
      trail.className = 'heart';
      trail.innerHTML = '💗';
      trail.style.left = `${event.clientX}px`;
      trail.style.top = `${event.clientY}px`;
      trail.style.fontSize = '14px';
      heartsLayer.appendChild(trail);
      trail.animate([
        { transform: 'translate(-50%, -50%) scale(0.6)', opacity: 0.7 },
        { transform: 'translate(-50%, -120%) scale(1.3)', opacity: 0 }
      ], { duration: 700, easing: 'ease-out' });
      setTimeout(() => trail.remove(), 700);
    }
  });

  document.addEventListener('dblclick', () => {
    createConfetti(140);
    launchFireworks();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
      createFloatingHearts();
    }
  });
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
    const hearts = Array.from(document.querySelectorAll('.heart'));
    hearts.forEach((heart) => {
      heart.animate([{ transform: 'scale(0.7)', opacity: 0.3 }, { transform: 'scale(1.2)', opacity: 1 }], { duration: 500, fill: 'forwards' });
    });
  }
});

document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (key.length === 1) {
    loveBuffer += key;
    if (loveBuffer.length > 4) {
      loveBuffer = loveBuffer.slice(-4);
    }
    if (loveBuffer === 'love') {
      createFloatingHearts();
      loveBuffer = '';
    }
  } else {
    loveBuffer = '';
  }
});
