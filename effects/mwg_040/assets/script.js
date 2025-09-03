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
            trigger:'.mwg_effect040',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const leftCircle = document.querySelector('.mwg_effect040 .parent-circle-left')
    const leftItems = leftCircle.querySelectorAll('.circle')

    const rightCircle = document.querySelector('.mwg_effect040 .parent-circle-right')
    const rightItems = rightCircle.querySelectorAll('.circle')

    const angle = 14

    const pinHeight = document.querySelector('.mwg_effect040 .pin-height')

    leftItems.forEach((el, index) => {
        gsap.set(el, {rotation: index * angle})
        // Negative angle for the child
        gsap.set(el.querySelector('p'), {rotation: -index * angle})
    })
    rightItems.forEach((el, index) => {
        gsap.set(el, {rotation: index * angle})
        // Negative angle for the child
        gsap.set(el.querySelector('.media'), {rotation: -index * angle})
    })

    gsap.to(leftCircle, {
        rotation: -(180 + angle * leftItems.length),
        ease: 'none', // Linear movement
        scrollTrigger: {
            trigger: pinHeight, // Listen to pin-height position
            pin: '.mwg_effect040 .container', // Pin the container
            start: 'top top',
            end: 'bottom bottom',
            scrub: true // Progression linked to scroll
        }
    })
    gsap.to(leftCircle.querySelectorAll('p'), {
        rotation: '+=' + (180 + angle * leftItems.length),
        ease: 'none', // Linear movement
        scrollTrigger: {
            trigger: pinHeight, // Listen to pin-height position
            start: 'top top',
            end: 'bottom bottom',
            scrub: true // Progression linked to scroll
        }
    })

    gsap.to(rightCircle, {
        rotation: -(180 + angle * leftItems.length),
        ease: 'none', // Linear movement
        scrollTrigger: {
            trigger: pinHeight, // Listen to pin-height position
            start: 'top top',
            end: 'bottom bottom',
            scrub: true // Progression linked to scroll
        }
    })
    gsap.to(rightCircle.querySelectorAll('.media'), {
        rotation: '+=' + (180 + angle * leftItems.length),
        ease: 'none', // Linear movement
        scrollTrigger: {
            trigger: pinHeight, // Listen to pin-height position
            start: 'top top',
            end: 'bottom bottom',
            scrub: true // Progression linked to scroll
        }
    })
})