const WHATSAPP_ORDER_NUMBER = '22995673480';

function openWhatsAppOrder(productName) {
  const message = `${productName}, je veux commander`;
  const url = `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          status.textContent = 'Merci, votre message a bien été envoyé. Nous vous répondrons rapidement.';
          status.style.color = 'green';
          form.reset();
        } else {
          status.textContent = "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter par WhatsApp.";
          status.style.color = 'crimson';
        }
      } catch (err) {
        status.textContent = "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter par WhatsApp.";
        status.style.color = 'crimson';
      } finally {
        status.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }
});
