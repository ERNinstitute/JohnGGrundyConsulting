const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

document.querySelectorAll('[data-copy-email]').forEach(button => {
  button.addEventListener('click', async () => {
    const email = button.dataset.copyEmail || '';
    const status = document.querySelector('[data-copy-status]');
    let copied = false;

    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try { copied = document.execCommand('copy'); } catch (fallbackError) { copied = false; }
      textarea.remove();
    }

    if (status) {
      status.textContent = copied ? 'Email address copied.' : `Copy this address: ${email}`;
    }
  });
});


const params = new URLSearchParams(window.location.search);
const selectedService = params.get('service');
if (selectedService) {
  const selectedBox = document.querySelector('[data-selected-service]');
  if (selectedBox) {
    selectedBox.hidden = false;
    const value = selectedBox.querySelector('span');
    if (value) value.textContent = selectedService;
  }
  const emailLink = document.querySelector('[data-email-inquiry]');
  if (emailLink) {
    const subject = `${selectedService} inquiry`;
    const body = `Selected service: ${selectedService}\n\nWhat is being evaluated?\n\nWhat decision does it inform?\n\nWhat materials are available?\n\nDesired timeline:\n`;
    emailLink.href = `mailto:john@johnggrundy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

// Re-apply fragment positioning after responsive layout and web fonts settle.
function alignFragmentTarget() {
  if (window.location.hash !== '#contact-details') return;
  const target = document.getElementById('contact-details');
  if (!target) return;
  window.requestAnimationFrame(() => {
    window.setTimeout(() => target.scrollIntoView({ block: 'start', behavior: 'auto' }), 80);
  });
}
window.addEventListener('load', alignFragmentTarget);
window.addEventListener('pageshow', alignFragmentTarget);
