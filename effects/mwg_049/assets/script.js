gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    /* LENIS SMOOTH SCROLL (OPTIONAL) */
    lenis = new Lenis({
        autoRaf: true,
    })
    /* LIENIS SMOOTH SCROLL (OPTIONAL) */

    gsap.to('.scroll', {
        autoAlpha:0,
        duration:0.2,
        scrollTrigger: {
            trigger:'.mwg_effect049',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const root = document.querySelector('.mwg_effect049')
    root.querySelectorAll('.container').forEach(container => {
        const title = container.querySelector('.title')
        wrapLettersInSpan(title)
        
        const dist = container.clientHeight - title.clientHeight

        ScrollTrigger.create({
            trigger: container, // Listen to the position of the container
            pin: title, // Pin the title
            start: 'top top', // When the container reaches the top of the viewport...
            end: '+=' + dist, // ...until the distance defined in the variable dist
        })
        
        const letters = container.querySelectorAll('span')
        letters.forEach(letter => {
            const randomDistance = Math.random() * dist // Different value for each letter

            gsap.from(letter, {
                y: randomDistance, // Move the letter down by the random distance
                ease: 'none', // Keep a linear ease
                scrollTrigger: {
                    trigger: title, // Listen to the title's position
                    start: 'top top', // Starts when the title touches the top of the screen...
                    end: '+=' + randomDistance, // ... and ends after the random distance
                    scrub: true // The animation progresses with the scroll
                }
            })
        })
    })
})

// UTIL METHOD
function wrapLettersInSpan(element) {
    const text = element.textContent;
    element.innerHTML = text
        .split('')
        .map(char => char === ' ' ? '<span>&nbsp;</span>' : `<span class="letter">${char}</span>`)
        .join('');
}