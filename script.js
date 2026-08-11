
// ============================================================
// GSAP — scroll animations
// ============================================================
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 36, rotateX: 6, transformPerspective: 900 },
      { opacity: 1, y: 0, rotateX: 0, duration: .9, delay: (i % 4) * .07, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
    );
  });

  gsap.utils.toArray('.sec-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true } }
    );
  });

  gsap.utils.toArray('.sec-tag').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: .6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
    );
  });

  gsap.utils.toArray('.step').forEach((step, i) => {
    gsap.fromTo(step,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: .7, delay: i * .1, ease: 'power2.out',
        scrollTrigger: { trigger: step, start: 'top 88%', once: true } }
    );
  });

  gsap.utils.toArray('.phase').forEach((ph, i) => {
    gsap.fromTo(ph,
      { opacity: 0, scale: .93, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: .75, delay: i * .12, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: ph, start: 'top 88%', once: true } }
    );
  });

  gsap.utils.toArray('.mesh-blob.b1').forEach(el => {
    const ctx = el.closest('section') || el.closest('header');
    if (ctx) gsap.to(el, { y: -60, ease: 'none',
      scrollTrigger: { trigger: ctx, start: 'top bottom', end: 'bottom top', scrub: 2 } });
  });
  gsap.utils.toArray('.mesh-blob.b2').forEach(el => {
    const ctx = el.closest('section') || el.closest('header');
    if (ctx) gsap.to(el, { y: 40, ease: 'none',
      scrollTrigger: { trigger: ctx, start: 'top bottom', end: 'bottom top', scrub: 2 } });
  });

  // Landing page hero — guarded, only runs on index.html
  if (document.querySelector('.bridge')) {
    gsap.timeline({ delay: .1 })
      .fromTo('.eyebrow',      { opacity: 0, y: 20 },           { opacity: 1, y: 0, duration: .7,  ease: 'power3.out' })
      .fromTo('h1',            { opacity: 0, y: 40, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: .9, ease: 'power3.out' }, '-=.4')
      .fromTo('.hero-sub',     { opacity: 0, y: 24 },           { opacity: 1, y: 0, duration: .7,  ease: 'power3.out' }, '-=.5')
      .fromTo('.hero-actions', { opacity: 0, y: 20 },           { opacity: 1, y: 0, duration: .6,  ease: 'power3.out' }, '-=.45')
      .fromTo('.bridge',       { opacity: 0, scale: .9, x: 30 },{ opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=.7')
      .fromTo('.scroll-hint',  { opacity: 0 },                  { opacity: 1, duration: .5, ease: 'power2.out' }, '-=.3');
  }

  // Sub-page hero entrance (entreprise.html + candidats.html)
  if (document.querySelector('.page-hero')) {
    gsap.timeline({ delay: .15 })
      .fromTo('.page-hero .eyebrow',         { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .65, ease: 'power3.out' })
      .fromTo('.page-hero h1',               { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: .85, ease: 'power3.out' }, '-=.35')
      .fromTo('.page-hero .hero-sub',        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .65, ease: 'power3.out' }, '-=.45')
      .fromTo('.page-hero .hero-actions',    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .55, ease: 'power3.out' }, '-=.4')
      .fromTo('.page-hero .free-hero-badge', { opacity: 0 },        { opacity: 1, duration: .5 }, '-=.3');
  }

  // About page hero entrance
  if (document.querySelector('.about-page-hero')) {
    gsap.timeline({ delay: .15 })
      .fromTo('.about-page-hero .eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .65, ease: 'power3.out' })
      .fromTo('.about-page-hero h1',       { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: .85, ease: 'power3.out' }, '-=.35')
      .fromTo('.about-page-hero p',        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .65, ease: 'power3.out' }, '-=.45');
  }
}

// Fallback IntersectionObserver (if GSAP CDN fails)
if (typeof gsap === 'undefined') {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ============================================================
// UNIVERSAL 3D TILT
// ============================================================
const TILT_SEL = '.price-card,.phase,.tilt-card,.value-card,.about-card,.gateway-card,.why-card';

document.querySelectorAll(TILT_SEL).forEach(card => {
  const max = card.matches('.price-card.featured,.founder-card') ? 7 : 11;
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - .5) * max * 2;
    const y = ((e.clientY - r.top)  / r.height - .5) * max * -2;
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02,1.02,1.02)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

document.querySelectorAll('.step').forEach(step => {
  step.addEventListener('mousemove', e => {
    const r = step.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - .5) * 5;
    const y = ((e.clientY - r.top)  / r.height - .5) * -4;
    step.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  step.addEventListener('mouseleave', () => { step.style.transform = ''; });
});

// ============================================================
// MAGNETIC BUTTONS
// ============================================================
document.querySelectorAll('.btn-primary,.nav-cta,.form-btn,.cand-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * .22;
    const y = (e.clientY - r.top  - r.height / 2) * .22;
    btn.style.transform = `translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ============================================================
// NAV
// ============================================================
const nav = document.getElementById('nav');

const burger = document.getElementById('burger'), navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ============================================================
// CV UPLOAD — candidats.html only
// ============================================================
const dropzone = document.getElementById('dropzone');
if (dropzone) {
  const cvFile = document.getElementById('cvFile'),
        dzMain = document.getElementById('dzMain'),
        dzSub  = document.getElementById('dzSub');
  const MAX = 5 * 1024 * 1024;

  function showFile(f) {
    if (!f) return;
    if (f.size > MAX) { dzSub.textContent = 'Fichier trop lourd (max 5 Mo)'; dropzone.classList.remove('has-file'); return; }
    dropzone.classList.add('has-file');
    dzMain.textContent = f.name;
    dzSub.textContent  = (f.size / 1024 / 1024).toFixed(1) + ' Mo · prêt à envoyer';
  }
  dropzone.addEventListener('click',   () => cvFile.click());
  dropzone.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' '){e.preventDefault();cvFile.click();} });
  cvFile.addEventListener('change',    () => showFile(cvFile.files[0]));
  ['dragenter','dragover'].forEach(ev => dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.add('drag'); }));
  ['dragleave','drop'].forEach(ev =>     dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.remove('drag'); }));
  dropzone.addEventListener('drop', e => { const f=e.dataTransfer.files[0]; if(f){cvFile.files=e.dataTransfer.files;showFile(f);} });
}

// ============================================================
// FORM VALIDATION HELPERS
// ============================================================
function fieldError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.closest('.field').classList.add('error');
  el.closest('.field').classList.remove('success');
  const span = document.getElementById(id + '-msg');
  if (span) span.textContent = msg;
}
function fieldOk(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.closest('.field').classList.remove('error');
  el.closest('.field').classList.add('success');
  const span = document.getElementById(id + '-msg');
  if (span) span.textContent = '';
}
function fieldClear(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.closest('.field').classList.remove('error', 'success');
  const span = document.getElementById(id + '-msg');
  if (span) span.textContent = '';
}
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRe = /^[+\d][\d\s.\-()+]{7,19}$/;

// ============================================================
// CANDIDATS.HTML — validation + native form submit
// ============================================================
const candForm = document.getElementById('candForm');
if (candForm) {
  function validateCandField(id) {
    const el  = document.getElementById(id);
    const val = el ? el.value.trim() : '';
    if (id === 'cn') {
      if (!val)          { fieldError('cn', 'Le nom est obligatoire'); return false; }
      if (val.length < 2){ fieldError('cn', 'Minimum 2 caractères');  return false; }
      fieldOk('cn'); return true;
    }
    if (id === 'ce') {
      if (!val)              { fieldError('ce', "L'email est obligatoire"); return false; }
      if (!emailRe.test(val)){ fieldError('ce', 'Adresse email invalide');  return false; }
      fieldOk('ce'); return true;
    }
    if (id === 'cp') {
      if (!val)              { fieldError('cp', 'Le téléphone est obligatoire');           return false; }
      if (!phoneRe.test(val)){ fieldError('cp', 'Format invalide (ex : +212 6 00 00 00 00)'); return false; }
      fieldOk('cp'); return true;
    }
    return true;
  }

  ['cn','ce','cp'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur',  () => validateCandField(id));
      el.addEventListener('input', () => { if (el.closest('.field').classList.contains('error')) validateCandField(id); });
    }
  });

  candForm.addEventListener('submit', function(e) {
    const okCn   = validateCandField('cn');
    const okCe   = validateCandField('ce');
    const okCp   = validateCandField('cp');
    const cvEl   = document.getElementById('cvFile');
    const hasFile = cvEl && cvEl.files.length > 0;
    const cvMsg  = document.getElementById('cv-msg');
    if (!hasFile) {
      if (cvMsg) cvMsg.textContent = 'Veuillez joindre votre CV';
      cvEl.closest('.field').classList.add('error');
    } else {
      if (cvMsg) cvMsg.textContent = '';
      cvEl.closest('.field').classList.remove('error');
    }
    if (!okCn || !okCe || !okCp || !hasFile) { e.preventDefault(); return; }
    const btn = document.getElementById('candBtn');
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;
  });
}

// ============================================================
// ENTREPRISE.HTML — validation + fetch submit
// ============================================================
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  function validateEntField(id) {
    const el  = document.getElementById(id);
    const val = el ? el.value.trim() : '';
    if (id === 'cy') {
      if (!val) { fieldError('cy', "Le nom de l'entreprise est obligatoire"); return false; }
      fieldOk('cy'); return true;
    }
    if (id === 'rl') {
      if (!val) { fieldError('rl', 'Veuillez choisir un profil'); return false; }
      fieldOk('rl'); return true;
    }
    if (id === 'em') {
      if (!val)              { fieldError('em', "L'email est obligatoire"); return false; }
      if (!emailRe.test(val)){ fieldError('em', 'Adresse email invalide');  return false; }
      fieldOk('em'); return true;
    }
    return true;
  }

  ['cy','rl','em'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur',  () => validateEntField(id));
      el.addEventListener('input', () => { if (el.closest('.field').classList.contains('error')) validateEntField(id); });
      el.addEventListener('change',() => { if (el.closest('.field').classList.contains('error')) validateEntField(id); });
    }
  });

  sendBtn.addEventListener('click', async function() {
    const okCy = validateEntField('cy');
    const okRl = validateEntField('rl');
    const okEm = validateEntField('em');
    if (!okCy || !okRl || !okEm) return;

    this.textContent = 'Envoi en cours…';
    this.disabled = true;

    const fd = new FormData();
    fd.append('_subject',        'Nouvelle demande entreprise — NextoMove');
    fd.append('_captcha',        'false');
    fd.append('Entreprise',      document.getElementById('cy').value.trim());
    fd.append('Poste recherché', document.getElementById('rl').value);
    fd.append('Email',           document.getElementById('em').value.trim());
    fd.append('Message',         document.getElementById('ms').value.trim());

    try {
      const res  = await fetch('https://formsubmit.co/ajax/contact@nextomove.com', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        this.textContent = 'Demande envoyée ✓'; this.style.background = 'var(--emerald)';
        ['cy','rl','em','ms'].forEach(id => fieldClear(id));
        setTimeout(() => { this.textContent = 'Envoyer ma demande'; this.style.background = ''; this.disabled = false; }, 2600);
      } else {
        throw new Error('Erreur serveur');
      }
    } catch {
      this.textContent = 'Erreur, réessayez'; this.style.background = '#c0392b';
      setTimeout(() => { this.textContent = 'Envoyer ma demande'; this.style.background = ''; this.disabled = false; }, 2600);
    }
  });
}