import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
//import '@fortawesome/fontawesome-free/css/all.min.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // If using ScrollTrigger for scroll-based animations

gsap.registerPlugin(ScrollTrigger);

const eventsScroll = document.getElementById('scrollEvents');
const eventsSection = document.getElementById('events');

const servicesScroll = document.getElementById('scrollServices');
const servicesSection = document.getElementById('services');

const contactsScroll = document.getElementById('scrollContacts');
const contactsSection = document.getElementById('contacts');

eventsScroll.addEventListener('click', () => {
    // Scroll to the target section
    gsap.to(window, { duration: 1, scrollTo: { bottom: eventsSection.getBoundingClientRect().bottomp }});
});

servicesScroll.addEventListener('click', () => {
    // Scroll to the target section
    gsap.to(window, { duration: 1, scrollTo: servicesSection });
});

contactsScroll.addEventListener('click', () => {
    // Scroll to the target section
    gsap.to(window, { duration: 1, scrollTo: contactsSection });
});

document.querySelector('#app').innerHTML = ``

//setupCounter(document.querySelector('#counter'))
