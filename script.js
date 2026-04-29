document.addEventListener('DOMContentLoaded', () => {
    // Burger menu
    const burger = document.querySelector('.burger'), nav = document.querySelector('.nav-links');
    burger.addEventListener('click', () => { nav.classList.toggle('nav-active'); burger.classList.toggle('toggle'); });
    document.querySelectorAll('.scroll-link').forEach(l => l.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) { nav.classList.remove('nav-active'); burger.classList.remove('toggle'); }
    }));

    // Header scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => { header.classList.toggle('scrolled', window.scrollY > 50); });

    // Smooth scroll
    document.querySelectorAll('.scroll-link').forEach(a => a.addEventListener('click', function (e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
    }));

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));

    // Ticket modal
    const modal = document.getElementById('ticketModalOverlay'), formC = document.getElementById('ticketFormContainer'),
        success = document.getElementById('ticketSuccess'), form = document.getElementById('ticketBuyForm'),
        tType = document.getElementById('ticketType'), tQty = document.getElementById('ticketQty'),
        tPrice = document.getElementById('totalPrice'), dateIn = document.getElementById('ticketDate');

    document.querySelectorAll('.open-ticket-modal').forEach(b => b.addEventListener('click', () => {
        dateIn.min = new Date().toISOString().split("T")[0]; modal.classList.add('active');
    }));

    dateIn.addEventListener('input', function (e) {
        if (new Date(this.value).getUTCDay() === 1) { e.preventDefault(); this.value = ''; alert('Дүйсенбі күні мұражай жабық. Басқа күнді таңдаңыз.'); }
    });

    const closeModal = () => { modal.classList.remove('active'); setTimeout(() => { form.reset(); updatePrice(); formC.style.display = 'block'; success.style.display = 'none'; }, 400); };
    document.getElementById('closeTicketModal').addEventListener('click', closeModal);
    document.getElementById('closeSuccessBtn').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    const updatePrice = () => {
        const p = parseInt(tType.options[tType.selectedIndex].getAttribute('data-price')), q = parseInt(tQty.value) || 1;
        tPrice.textContent = (p * q).toLocaleString('kk-KZ');
    };
    tType.addEventListener('change', updatePrice);
    tQty.addEventListener('input', updatePrice);

    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]'), orig = btn.textContent;
        btn.textContent = 'Төлем өңделуде...'; btn.style.opacity = '0.7';
        setTimeout(() => { formC.style.display = 'none'; success.style.display = 'block'; btn.textContent = orig; btn.style.opacity = '1'; }, 1200);
    });
});
