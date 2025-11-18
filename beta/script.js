document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THEME TOGGLER ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleButton.querySelector('.material-symbols-outlined');

    // Function to set the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeIcon.textContent = 'dark_mode';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            themeIcon.textContent = 'light_mode';
            localStorage.setItem('theme', 'light');
        }
    };

    // Check for saved theme in localStorage on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Event listener for the toggle button
    themeToggleButton.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        applyTheme(isDark ? 'light' : 'dark');
    });

    // --- 2. RIPPLE EFFECT ---
    const createRipple = (event) => {
        const button = event.currentTarget;
        
        // Create the ripple element
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        // Position the ripple
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        // Clean up previous ripples
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        // Add the new ripple and remove it after animation
        button.appendChild(circle);
    };

    // Apply ripple effect to all buttons and cards
    const rippleElements = document.querySelectorAll('.btn, .icon-button, .card');
    rippleElements.forEach(elem => {
        elem.addEventListener('click', createRipple);
    });

    // --- 3. SCROLL FADE-IN ANIMATION ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing the element once it's visible to prevent re-animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start observing each section
    fadeInSections.forEach(section => {
        observer.observe(section);
    });

});
