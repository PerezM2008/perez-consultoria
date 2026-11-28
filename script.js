// Configure aqui o número comercial, incluindo DDI 55 e DDD, somente dígitos.
// Exemplo de formato (não é um número real): '55DDNUMERO'.
const WHATSAPP_NUMBER = '5511959888298';
const services = [
    ['⌘', 'Desenvolvimento de Sistemas', 'Desenvolvimento de sites institucionais, plataformas digitais e sistemas personalizados, de acordo com as necessidades de cada negócio.'],
    ['⚙', 'Automação Empresarial', 'Automatização de tarefas e processos operacionais para reduzir atividades manuais, melhorar fluxos de trabalho e aumentar a eficiência.'],
    ['▣', 'CRM e Gestão de Clientes', 'Organização do relacionamento com clientes, acompanhamento comercial e centralização de informações para melhorar a gestão.'],
    ['✧', 'Inteligência Artificial', 'Aplicação de soluções de inteligência artificial para otimizar atividades, apoiar atendimentos e melhorar processos empresariais.'],
    ['↔', 'Integrações e WhatsApp', 'Integração de sistemas, plataformas e canais de comunicação para tornar o atendimento e a operação mais conectados.'],
    ['◈', 'Consultoria Tecnológica', 'Análise das necessidades empresariais, identificação de oportunidades e planejamento de soluções tecnológicas adequadas à realidade de cada empresa.']
];
const grid = document.querySelector('#services');
services.forEach(([icon, name, desc]) => { const card = document.createElement('article'); card.className = 'service'; const ico = document.createElement('div'); ico.className = 'service-icon'; ico.textContent = icon; const h = document.createElement('h3'); h.textContent = name; const p = document.createElement('p'); p.textContent = desc; const b = document.createElement('button'); b.className = 'whatsapp'; b.textContent = 'Tenho interesse →'; b.dataset.message = `Olá! Conheci a PEREZ pelo site e gostaria de saber mais sobre ${name}.`; card.append(ico, h, p, b); grid.append(card) });
const dialog = document.querySelector('#wa-dialog'); document.addEventListener('click', e => { const b = e.target.closest('.whatsapp'); if (!b) return; const number = WHATSAPP_NUMBER.replace(/\D/g, ''); if (!/^55\d{10,11}$/.test(number)) { dialog.showModal(); return } const message = b.dataset.message || 'Olá! Gostaria de conhecer a PEREZ.'; window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer') }); document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
const hamb = document.querySelector('#hamb'), menu = document.querySelector('#menu'); hamb.addEventListener('click', () => { const open = menu.classList.toggle('open'); hamb.setAttribute('aria-expanded', String(open)); hamb.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu') }); menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); hamb.setAttribute('aria-expanded', 'false') }));
const header = document.querySelector('#topbar'); window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true }); const sections = document.querySelectorAll('main section[id]'); const links = menu.querySelectorAll('a'); const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)) }) }, { rootMargin: '-30% 0px -60% 0px' }); sections.forEach(s => observer.observe(s)); document.querySelector('#year').textContent = new Date().getFullYear();

const carousel = document.querySelector('[data-client-carousel]');
if (carousel) {
    const firstSet = carousel.querySelector('[data-client-set]');
    let setWidth = firstSet.getBoundingClientRect().width;
    let dragStartX = 0, dragStartScroll = 0, dragPointer = null, isDragging = false;
    const setInitialPosition = () => { setWidth = firstSet.getBoundingClientRect().width; carousel.scrollLeft = setWidth };
    const keepInMiddleSet = () => {
        if (!setWidth) return;
        const offset = ((carousel.scrollLeft - setWidth) % setWidth + setWidth) % setWidth;
        const adjusted = setWidth + offset;
        if (Math.abs(carousel.scrollLeft - adjusted) > 1) carousel.scrollLeft = adjusted;
    };
    setInitialPosition();
    carousel.addEventListener('scroll', keepInMiddleSet, { passive: true });
    carousel.addEventListener('pointerdown', event => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        dragPointer = event.pointerId; dragStartX = event.clientX; dragStartScroll = carousel.scrollLeft; isDragging = false;
        carousel.setPointerCapture(event.pointerId);
    });
    carousel.addEventListener('pointermove', event => {
        if (event.pointerId !== dragPointer) return;
        const distance = event.clientX - dragStartX;
        if (Math.abs(distance) > 3) isDragging = true;
        if (isDragging) { carousel.classList.add('is-dragging'); carousel.scrollLeft = dragStartScroll - distance; event.preventDefault() }
    });
    const endDrag = event => {
        if (event.pointerId !== dragPointer) return;
        dragPointer = null; carousel.classList.remove('is-dragging');
        isDragging = false;
    };
    carousel.addEventListener('pointerup', endDrag);
    carousel.addEventListener('pointercancel', endDrag);
    carousel.addEventListener('lostpointercapture', endDrag);
    carousel.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        carousel.scrollBy({ left: event.key === 'ArrowRight' ? 240 : -240, behavior });
    });
    window.addEventListener('resize', () => {
        const previousWidth = setWidth;
        const progress = previousWidth ? (((carousel.scrollLeft - previousWidth) % previousWidth + previousWidth) % previousWidth) / previousWidth : 0;
        setWidth = firstSet.getBoundingClientRect().width;
        if (setWidth && previousWidth) carousel.scrollLeft = setWidth + progress * setWidth;
    });
}
