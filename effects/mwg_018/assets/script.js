gsap.registerPlugin(ScrollTrigger, CustomEase)

window.addEventListener("DOMContentLoaded", () => {

    /* LENIS SMOOTH SCROLL (OPTIONAL) */
    lenis = new Lenis({
        autoRaf: true,
    })
    /* LIENIS SMOOTH SCROLL (OPTIONAL) */

    const root = document.querySelector('.mwg_effect018')
    const pinHeight = root.querySelector('.pin-height')
    const container = root.querySelector('.container')
    const cards = root.querySelectorAll('.card')

    gsap.to('.scroll', {
        autoAlpha:0,
        duration:0.2,
        scrollTrigger: {
            trigger: root,
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })
    
    ScrollTrigger.create({
        trigger: pinHeight, // We listen to pinHeight position
        start:'top top',
        end:'bottom bottom',
        pin: container, // We pin our container
        pinSpacing: false, // No extra space is added around the pinned element
        scrub: true // Progresses with the scroll
    })

    gsap.set(cards, {
        yPercent: 50, // Translate by half the element’s height
        y: 0.5 * window.innerHeight, // Translate by half the screen’s height
    })

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: root, // Based on the root of our component
            start: 'top top', // Starts when the top of root reaches the top of the viewport
            end: 'bottom bottom', // Ends when the bottom of root reaches the bottom of the viewport
            scrub: true, // Progresses with the scroll
        }
    })

    tl.to(cards, {
        yPercent: -50, // Translate by half the element’s height
        y: -0.5 * window.innerHeight, // Translate by half the screen’s height
        duration: 1,
        stagger: 0.12,
        ease: CustomEase.create("custom", "M0,0 C0,0 0.098,0.613 0.5,0.5 0.899,0.386 1,1 1,1 "),
    }, 'step') // The other 'step' tweens will start simultaneously in our timeline
    tl.to(cards, {
        rotation: () => { return (Math.random() - 0.5) * 20 }, // Method to have a unique value per card
        stagger: 0.12,
        duration: 0.5, // Lasts half as long as the movement tween
        ease: 'power3.out', // Slows down towards the end of the rotation
    }, 'step')
    tl.to(cards, {
        rotation: 0,
        stagger: 0.12,
        duration: 0.5, // Lasts half as long as the movement tween
        ease: 'power3.in', // Slows down at the beginning of the rotation
    }, 'step+=0.5') // Starts halfway through the movement tween
})