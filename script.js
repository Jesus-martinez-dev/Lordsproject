document.addEventListener("DOMContentLoaded", () => {
  // Current Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Load Navbar Animation
  setTimeout(() => {
    document.getElementById('navbar').classList.add('loaded');
  }, 100);

  // Load Hero Animations
  setTimeout(() => {
    const heroLogo = document.querySelector('.hero-logo-wrapper');
    if (heroLogo) heroLogo.classList.add('active');
  }, 200);
  setTimeout(() => {
    document.getElementById('hero-title').classList.add('active');
  }, 400);
  setTimeout(() => {
    document.getElementById('hero-desc').classList.add('active');
  }, 600);
  setTimeout(() => {
    document.getElementById('hero-btn').classList.add('active');
  }, 800);


  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -100px 0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-up').forEach(el => {
    // Avoid triggering hero animations via observer since they run on load
    if (!el.closest('.hero')) {
      observer.observe(el);
    }
  });
});
