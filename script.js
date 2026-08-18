document.addEventListener("DOMContentLoaded", () => {
  // Current Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Load Navbar Animation
  setTimeout(() => {
    document.getElementById('navbar').classList.add('loaded');
  }, 100);

  // Load Hero Animations
  setTimeout(() => {
    document.getElementById('hero-title').classList.add('active');
  }, 300);
  setTimeout(() => {
    document.getElementById('hero-desc').classList.add('active');
  }, 500);
  setTimeout(() => {
    document.getElementById('hero-btn').classList.add('active');
  }, 700);

  // Team Data
  const teamMembers = [
    { name: "Jesús Martínez", role: "Contenido", specialty: "Contenido", color: "#a855f7", hiveUser: "jesusm", hiveLink: "https://hive.blog/@jesusm" },
    { name: "Luis Valdes", role: "Soporte", specialty: "Soporte", color: "#10b981", hiveUser: null, hiveLink: null },
    { name: "Sebastian Sifontes", role: "Soporte", specialty: "Soporte", color: "#10b981", hiveUser: null, hiveLink: null },
    { name: "Carlos Salas", role: "Arte y Diseño", specialty: "Arte", color: "#ec4899", hiveUser: null, hiveLink: null },
    { name: "Luis David", role: "Contenido", specialty: "Contenido", color: "#a855f7", hiveUser: "luisdavid", hiveLink: "https://hive.blog/@luisdavid" },
    { name: "Sahel Hernández", role: "Soporte", specialty: "Soporte", color: "#10b981", hiveUser: null, hiveLink: null },
    { name: "Luis Hernández", role: "Soporte", specialty: "Soporte", color: "#10b981", hiveUser: null, hiveLink: null }
  ];

  const teamGrid = document.getElementById("team-grid");

  teamMembers.forEach((member, index) => {
    const isClickable = Boolean(member.hiveLink);
    const wrapper = document.createElement(isClickable ? "a" : "div");
    if (isClickable) {
      wrapper.href = member.hiveLink;
      wrapper.target = "_blank";
      wrapper.rel = "noopener noreferrer";
    }
    wrapper.className = `team-card reveal-up delay-${(index % 4) + 1}`;
    wrapper.style.setProperty('--glow-color', member.color);

    let headerContent = '';
    if (member.hiveUser) {
      headerContent += `<span class="team-user">@${member.hiveUser}</span>`;
    } else {
      headerContent += `<span></span>`; // empty spacer
    }

    const promptText = member.name === "Jesús Martínez"
      ? `chibi pixel art profile picture of a male man knight in armor with black hair, cute pixelart knight character, 8-bit retro gaming style, highly detailed pixel art`
      : `chibi pixel art profile picture of a knight in armor ${member.name}, cute pixelart knight character, 8-bit retro gaming style, highly detailed pixel art`;
    const prompt = encodeURIComponent(promptText);
    const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=300&height=300&nologo=true`;

    wrapper.innerHTML = `
      <div class="tcg-avatar-container">
        <img src="${imageUrl}" alt="${member.name}" class="tcg-avatar-img" />
      </div>
      ${isClickable ? `<div class="team-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #fff;"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </div>` : ''}
      <div class="team-card-header">
        ${headerContent}
      </div>
      <div class="team-card-body">
        <h4 class="team-name">${member.name}</h4>
        <p class="team-role">${member.role}</p>
        <span class="team-specialty-badge">${member.specialty}</span>
      </div>
    `;

    teamGrid.appendChild(wrapper);
  });

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
