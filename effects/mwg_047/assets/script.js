gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    const lenis = new Lenis({
        orientation: 'horizontal', // Horizontal scroll
        infinite: true, // Infinite repeat
        autoRaf: true
    })

    // Updates all ScrollTrigger instances on scroll
    lenis.on('scroll', ScrollTrigger.update)

    // Forces the scroll position to the very beginning
    lenis.scrollTo(0, {
        immediate: true,
    })
    
    document.querySelectorAll('.mwg_effect047 .media').forEach(el => {
        // Image appearance
        gsap.fromTo(el.querySelector('img'), {
            transformOrigin: '0% 50%' // Starting from the left edge
        }, {
            transformOrigin: '0% 50%',
            scaleX: 1, // Returning to initial width
            ease: 'none', // Linear movement
            scrollTrigger: {
                horizontal: true,
                trigger: el, // Listen to the image position
                start: 'left 100%', // Starts when the left edge of the image is on the right side of the viewport
                end: 'left 80%', // Ends when the left edge of the image is at 80% of the viewport
                scrub: true, // Progresses with the scroll
            }
        })
        
        // Disappearance of the image
        gsap.fromTo(el.querySelector('img'), {
            transformOrigin: '100% 50%'
        }, {
            transformOrigin: '100% 50%',
            scaleX: 0, // Squashing the image
            ease: 'none', // Linear movement
            immediateRender: false, // To avoid tween conflicts
            scrollTrigger: {
                horizontal: true,
                trigger: el, // Listen to the image position
                start: 'right 20%', // Starts when the right edge of the image is at 20% of the viewport
                end: 'right 0%', // Ends when the right edge of the image is at 0% of the viewport
                scrub: true, // Progresses with the scroll
            }
        })
    })
})