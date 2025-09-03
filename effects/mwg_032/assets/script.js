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
            trigger:'.mwg_effect032',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const root = document.querySelector('.mwg_effect032')
    
    // Get the actual text content
    const textPath = root.querySelector('#textpath')
    const text = textPath.textContent.trim()
    
    // Calculate text width using canvas
    const textPathLength = getTextWidth(text) * 1.25
    
    // Calculate final offset percentage
    const pathLength = root.querySelector('#path').getTotalLength()
    const finalOffset = -(textPathLength * 100 / pathLength)

    gsap.to(textPath, {
        attr: { startOffset: finalOffset + "0%" }, // Here we are targeting an attribute value, not a CSS property
        ease:'none', // Linear movement
        scrollTrigger: {
            trigger: '.mwg_effect032 .pin-height',
            start: 'top top',
            end: 'bottom bottom',
            pin: '.mwg_effect032 .container',
            scrub: true // Progresses with the scroll
        }
    }) 

    // UTIL METHOD
    function getTextWidth(text) {
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"))
        const context = canvas.getContext("2d")
        const computedStyle = window.getComputedStyle(document.querySelector('#textpath'))
        context.font = computedStyle.font
        
        return context.measureText(text).width
    }
})