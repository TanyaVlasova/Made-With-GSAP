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
            trigger:'.mwg_effect029',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const paragraph = document.querySelector('.mwg_effect029 .paragraph')
    wrapWordsInSpan(paragraph)

    const words = paragraph.querySelectorAll('span')
    words.forEach(word => {
        // Assign a class between word0, word1, word2, word3
        word.classList.add('word' + Math.floor(Math.random() * 4))
    })

    // For all words with the class word1
    document.querySelectorAll('.mwg_effect029 .word1').forEach(el => {
        gsap.to(el, {
            x: '-0.8em', // Same value as in CSS
            ease: 'none', // Linear movement
            scrollTrigger: {
                trigger: el, // Track the word's position
                start: 'top 80%', // Start when the word’s top reaches 80% of the viewport height
                end: 'bottom 60%', // End when the word’s bottom reaches 60% of the viewport height
                scrub: 0.2 // Syncs with the scroll and takes 0.2s to update
            }
        })
    })
    document.querySelectorAll('.mwg_effect029 .word2').forEach(el => {
        gsap.to(el, {
            x: '1.6em', // Same value as in CSS
            ease: 'none',
            scrollTrigger: {
                trigger: el, // We listen to the word's position
                start: 'top 80%',
                end: 'bottom 60%',
                scrub: 0.2
            }
        })
    })
    document.querySelectorAll('.mwg_effect029 .word3').forEach(el => {
        gsap.to(el, {
            x: '-2.4em', // Same value as in CSS
            ease: 'none',
            scrollTrigger: {
                trigger: el, // We listen to the word's position
                start: 'top 80%',
                end: 'bottom 60%',
                scrub: 0.2
            }
        })
    })
})

// UTIL METHOD
function wrapWordsInSpan(element) {
    const text = element.textContent;
    element.innerHTML = text
        .split(' ')
        .map(word => `<span>${word}</span>`)
        .join(' ');
}