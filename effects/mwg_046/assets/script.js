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
            trigger:'.mwg_effect046',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    wrapLettersInSpan(document.querySelector('.mwg_effect046 .sentence'))

    const letters = document.querySelectorAll('.mwg_effect046 .letter span')
    const pinHeight = document.querySelector('.mwg_effect046 .pin-height')
    const container = document.querySelector('.mwg_effect046 .container')
    const shuffleLetters = shuffleArray(Array.from(letters))

    ScrollTrigger.create({
        trigger: pinHeight, // We listen to pinHeight position
        start: 'top top',
        end: 'bottom bottom',
        pin: container, // We pin the container
    })

    const distPerLetter = (pinHeight.clientHeight - window.innerHeight) / letters.length
    for(let i = 0; i < letters.length; i++){
        // shuffleLetters contains the letter in a random order
        gsap.from(shuffleLetters[i], {
            // From 110% to 0%, its initial state
            y: '110%', // Depends on the font used
            ease: 'power4.inOut',
            duration: 0.8,
            scrollTrigger: {
                trigger: pinHeight,
                start: 'top top-=' + distPerLetter * i,
                end: '+=1',
                toggleActions: 'play none reverse none'
            }
        })
    }
})

// UTIL METHODS
function wrapLettersInSpan(element) {
    // Retrieve the textual content of the provided element
    const text = element.textContent
    element.innerHTML = text
        .split(' ')
        .map(word =>
            `<span class="word">${word
                .split('')
                .map(char => `<span class="letter"><span>${char}</span></span>`)
                .join('')}</span>`
        )
        .join(' ')
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}