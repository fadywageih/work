// Counter Animation
const counters = document.querySelectorAll('.counter');
let animated = false;

const startCounters = () => {
    if (animated) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count) + (counter.getAttribute('data-target') === '100' ? '%' : '');
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target + (counter.getAttribute('data-target') === '100' ? '%' : '');
            }
        };
        
        updateCounter();
    });
    
    animated = true;
};

// Trigger counters when visible
window.addEventListener('scroll', () => {
    const stats = document.querySelector('#home .counter');
    if (stats) {
        const rect = stats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            startCounters();
        }
    }
});