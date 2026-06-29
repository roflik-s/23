/* Библиотека мифов — основной скрипт */

document.addEventListener('DOMContentLoaded', () => {
  createStars();
  createParticles();
  initModals();
});

function createStars() {
  const container = document.querySelector('.stars-bg');
  if (!container) return;

  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --duration: ${Math.random() * 4 + 2}s;
      --delay: ${Math.random() * 5}s;
      --opacity: ${Math.random() * 0.6 + 0.3};
    `;
    container.appendChild(star);
  }

  const fog = document.createElement('div');
  fog.className = 'fog';
  container.appendChild(fog);
}

function createParticles() {
  const container = document.querySelector('.stars-bg');
  if (!container) return;

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      --duration: ${Math.random() * 10 + 6}s;
      --delay: ${Math.random() * 8}s;
      --drift: ${(Math.random() - 0.5) * 60}px;
    `;
    container.appendChild(particle);
  }
}

function initModals() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.modal-close');

  document.querySelectorAll('.btn-read').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.myth-card');
      if (!card) return;

      overlay.querySelector('.modal-image').src = card.dataset.image;
      overlay.querySelector('.modal-image').alt = card.dataset.title;
      overlay.querySelector('.modal-culture').textContent = card.dataset.culture;
      overlay.querySelector('.modal-title').textContent = card.dataset.title;
      overlay.querySelector('.modal-author').textContent = 'Автор: ' + card.dataset.author;
      overlay.querySelector('.modal-text').innerHTML = card.dataset.fulltext;

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
}
