// --- Set dark theme ---
document.documentElement.setAttribute('data-theme', 'dark');

// --- Mobile menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => mobileMenu.classList.toggle('show'));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('show')));

// --- Back to top button ---
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) toTop.classList.add('show');
  else toTop.classList.remove('show');
  setActiveLink();
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// --- Active nav highlighting ---
const sections = ['about','skills','projects','timeline','contact'].map(id => document.getElementById(id));
const links = Array.from(document.querySelectorAll('a.link'));
function setActiveLink(){
  let idx = -1;
  const y = window.scrollY + window.innerHeight * 0.35; // bias to center
  sections.forEach((sec, i) => {
    if (!sec) return;
    const rect = sec.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const bottom = top + rect.height;
    if (y >= top && y < bottom) idx = i;
  });
  links.forEach((a, i) => a.classList.toggle('active', i === idx));
}
setActiveLink();

// --- Year ---
document.getElementById('year').textContent = new Date().getFullYear();


// --- Small reveal on scroll ---
const revealEls = document.querySelectorAll('.about-card, .project, .skill, .stat');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.animate([
        { opacity: 0, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 400, easing: 'ease-out' });
      io.unobserve(e.target);
    }
  });
}, { threshold: .12 });
revealEls.forEach(el => io.observe(el));

