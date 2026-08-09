import './livestream.js';

gsap.registerPlugin(ScrollToPlugin);

const servicesScrollBtn = document.getElementById('scrollServices');
const servicesSection = document.getElementById('services');

const livestreamScrollBtn = document.getElementById('scrollLivestream');
const livestreamSection = document.getElementById('livestream');

const eventsScrollBtn = document.getElementById('scrollEvents');
const eventsSection = document.getElementById('events');

const contactsScrollBtn = document.getElementById('scrollContacts');
const contactsSection = document.getElementById('contacts');

servicesScrollBtn.addEventListener('click', () => {
    console.log("Top Position: ", servicesScrollBtn.getBoundingClientRect().top );
    console.log("Bottom Position: ", servicesScrollBtn.getBoundingClientRect().bottom );
    
    gsap.to(window, {
    duration: 0.7, // Example: animation duration in seconds
    scrollTo: '#services'
    });
});

livestreamScrollBtn.addEventListener('click', () => {
    gsap.to(window, {
        duration: 0.7,
        scrollTo: '#livestream'
    });
});

eventsScrollBtn.addEventListener('click', () => {
    gsap.to(window, {
        duration: 0.7,
        scrollTo: '#events'
    });
});

contactsScrollBtn.addEventListener('click', () => {
    gsap.to(window, 
    { 
        duration: 0.7,
        scrollTo: '#contacts'
        });
});

document.querySelector('#app').innerHTML = ``


const CLOUD_NAME = 'dg5gjhi8r';
const TAG = 'events';

async function loadEventImages() {
    try {
        const res = await fetch(
        `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAG}.json`
        );
        const data = await res.json();
        const container = document.getElementById('event-images');

        // Sort by upload date descending, take last 3
        const latest = data.resources
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3);

        container.innerHTML = latest.map((img, i) => `
        <div class="px-4 ${i > 0 ? 'hidden lg:block' : ''}">
            <img
            src="https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${img.public_id}.${img.format}"
            alt="Event image ${i + 1}"
            />
        </div>
        `).join('');

        } catch (err) {
            console.error('Could not load event images:', err);
        }
}

loadEventImages();

const menuBtn = document.getElementById('menu-btn');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const menuBackdrop = document.getElementById('menu-backdrop');

function smoothScrollTo(target) {
    gsap.to(window, {
        duration: 0.7,
        scrollTo: target
    });
}

function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    menuBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    menuBackdrop.classList.add('opacity-100', 'pointer-events-auto');
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    menuBackdrop.classList.add('opacity-0', 'pointer-events-none');
    menuBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
}

menuBtn.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuBackdrop.addEventListener('click', closeMenu);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
        smoothScrollTo(link.dataset.target);
    });
});
