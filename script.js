const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

const revealEls = document.querySelectorAll('[data-reveal]');
revealEls.forEach((el, i) => el.dataset.revealIndex = i);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (parseInt(e.target.dataset.revealIndex) % 4) * 0.12 + 's';
      e.target.classList.add('revealed');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

function filter(brand,btn){
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cards=document.querySelectorAll('.product-card');
      let v=0;
      cards.forEach(c=>{const show=brand==='all'||c.dataset.brand===brand;c.classList.toggle('hidden',!show);if(show)v++});
      document.getElementById('countTag').textContent=v+' vehicle'+(v!==1?'s':'');
}

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
document.getElementById('mobileMenu')?.addEventListener('click', e => {
  if (e.target.tagName === 'A') document.getElementById('mobileMenu').classList.remove('open');
});

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    const fields = form.querySelectorAll('[required]');
    fields.forEach(f => {
      const err = document.getElementById(f.id + 'Error');
      if (!f.value.trim()) {
        valid = false; f.classList.add('error');
        if (err) err.style.display = 'block';
      } else {
        f.classList.remove('error');
        if (err) err.style.display = 'none';
      }
    });
    const email = document.getElementById('email');
    if (email) {
      const emailErr = document.getElementById('emailError');
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value && !emailRe.test(email.value)) {
        valid = false; email.classList.add('error');
        if (emailErr) { emailErr.textContent = 'Please enter a valid email address.'; emailErr.style.display = 'block'; }
      }
    }
    const phone = document.getElementById('phone');
    if (phone && phone.value) {
      const phoneRe = /^[\d\s\+\-\(\)]{7,15}$/;
      const phoneErr = document.getElementById('phoneError');
      if (!phoneRe.test(phone.value)) {
        valid = false; phone.classList.add('error');
        if (phoneErr) phoneErr.style.display = 'block';
      }
    }
    if (valid) {
      const success = document.getElementById('formSuccess');
      if (success) { form.style.display = 'none'; success.style.display = 'flex'; }
    }
  });
  form.querySelectorAll('input, select, textarea').forEach(f => {
    f.addEventListener('input', () => {
      f.classList.remove('error');
      const err = document.getElementById(f.id + 'Error');
      if (err) err.style.display = 'none';
    });
  });
}