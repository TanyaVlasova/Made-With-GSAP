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
            trigger: document.body,
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })
    
    gsap.to('.mwg_effect027 .letter', {
        yPercent: 100, // Moves the letter down by 100% of its height
        ease: 'power1.inOut', // Non-linear motion
        scrollTrigger: {
            trigger: '.mwg_effect027 ul', // Listens to the list position
            start: '33.33% bottom',
            end: '100% 80%',
            scrub: 1 // Progresses with the scroll, takes 1s to update
        },
        stagger: {
            each: 0.05,
            from: 'random' // Randomizes the animation order of letters
        }
    })
})