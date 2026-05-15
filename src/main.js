import './style.css'
import javascriptLogo from './javascript.svg'
//import '@fortawesome/fontawesome-free/css/all.min.css';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // If using ScrollTrigger for scroll-based animations

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
        scrollTo: '#events'
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
