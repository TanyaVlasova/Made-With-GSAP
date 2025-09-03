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
            trigger:'.mwg_effect048',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const medias = document.querySelectorAll('.mwg_effect048 .media')
    medias.forEach(media => {
        gsap.to(media, {
            rotationY: 360,
            ease: 'none', // Linear movement
            scrollTrigger: {
                trigger: media,
                // Starts when the top of the media section enters the viewport
                start: 'top bottom',
                // Ends when the bottom of the media section exits the viewport
                end: 'bottom top',
                scrub: true // Progresses with the scroll
            }
        })
    })
})