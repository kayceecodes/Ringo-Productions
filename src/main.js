import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
//import '@fortawesome/fontawesome-free/css/all.min.css';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // If using ScrollTrigger for scroll-based animations

gsap.registerPlugin(ScrollToPlugin);

const servicesScrollBtn = document.getElementById('scrollServices');
const servicesSection = document.getElementById('services');

const eventsScrollBtn = document.getElementById('scrollEvents');
const eventsSection = document.getElementById('events');

const contactsScrollBtn = document.getElementById('scrollContacts');
const contactsSection = document.getElementById('contacts');

servicesScrollBtn.addEventListener('click', () => {
    console.log("Top Position: ", servicesScrollBtn.getBoundingClientRect().top );
    console.log("Bottom Position: ", servicesScrollBtn.getBoundingClientRect().bottom );
    
    gsap.to(window, {
    duration: 1, // Example: animation duration in seconds
    scrollTo: '#services'
    });
});

eventsScrollBtn.addEventListener('click', () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: '#events'
    });
});

contactsScrollBtn.addEventListener('click', () => {
    gsap.to(window, 
    { 
        duration: 1,
        scrollTo: '#contacts'
        });
});

document.querySelector('#app').innerHTML = ``

//setupCounter(document.querySelector('#counter'))
