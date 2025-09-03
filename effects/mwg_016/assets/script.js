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
            trigger:'.mwg_effect016',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const root = document.querySelector('.mwg_effect016')
    const pinHeight = root.querySelector('.pin-height')
    const container = root.querySelector('.container')
    
    ScrollTrigger.create({
        trigger: pinHeight, // Listens to pin-height
        start:'top top',
        end:'bottom bottom',
        pin: container // The pinned section
    })

    const mediaWrappers = root.querySelectorAll('.media-wrapper')
    
    const mediasLength = mediaWrappers.length;
    const angle = 360 / mediasLength
    
    const medias = root.querySelectorAll('.media')
    mediaWrappers.forEach((wrapper, index) => {
        // Assign the angle to each wrapper
        gsap.set(wrapper, {rotation: -angle * index})
        // Assign the opposite angle to the child of the wrapper
        gsap.set(medias[index], {rotation: angle * index})
    })
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: pinHeight, // Listens to pin-height
            start: 'top top',
            end: 'bottom bottom',
            scrub: true // Progresses with the scroll
        }
    });
    
    tl.to(mediaWrappers, {
        rotation:'+=180', // += adds 180 from the current angle
        stagger: 0.04, // Animation delay between each element 
        ease:'power1.out', // Non-linear
    })
    tl.to(medias, { 
        x: 0, // Re-centers the child
        rotation: '-=180', // -= subtracts 180 from the current angle
        ease: 'power1.out', 
        stagger: 0.04, // Animation delay between each element
    }, '<'); // Means the animation starts at the start of the previous tween
    tl.from(medias, { 
        autoAlpha: 0, // The element is initially invisible and hidden
        duration: 0.03, // Plays quickly
        stagger: 0.04, // Animation delay between each element
    }, '<') // Means the animation starts at the start of the previous tween

})