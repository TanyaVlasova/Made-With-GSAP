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
            trigger:'.mwg_effect043',
            start:'top bottom',
            end:'top bottom-=1',
            toggleActions: "play none reverse none"
        }
    })

    const angle = 3
    const root = document.querySelector('.mwg_effect043')
    const cardWrappers = root.querySelectorAll('.card-wrapper')
    const cards = root.querySelectorAll('.card')
    const totalCards = cards.length - 1

    cardWrappers.forEach((el, index) => {
        // Calculates the initial rotation for each 'cardWrapper'
        // - 'angle * index': Spreads cards evenly based on their index
        // - '(angle * totalCards / 2)': Centers the distribution by offsetting half of the total spread
        const firstRot = angle * index - (angle * totalCards / 2)
        // Instantly applies the calculated rotation to each card
        gsap.set(el, {rotation: firstRot})
    })

    // Reveal Animation
    gsap.from(cardWrappers, {
        rotation: 40, // Starting rotation
        stagger: 0.07, // Delay between each start
        ease: 'elastic.out(1, 0.75)', // Elastic movement
        duration: 1.5,
        scrollTrigger: {
            trigger: root, // Listens to the position of root
            start: 'top 20%' // Starts when the top of root is at 20% of the height of the viewport
        },
        onComplete: () => {
            root.classList.add('on') // When the animation is complete
        }
    })
})