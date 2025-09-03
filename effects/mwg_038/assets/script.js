gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    /* LENIS SMOOTH SCROLL (OPTIONAL) */
    lenis = new Lenis({
        autoRaf: true,
    })
    /* LIENIS SMOOTH SCROLL (OPTIONAL) */

    /* Only on large devices */
    const mm = gsap.matchMedia()
    mm.add("(min-width: 769px)", () => {
        const projects = document.querySelectorAll('.mwg_effect038 .project')
        projects[0].classList.add('on')
        const numProjects = projects.length;
        let currentProject = projects[0]

        const container = document.querySelector('.mwg_effect038 .container')
        const dist = container.clientWidth - document.body.clientWidth

        gsap.to(container, {
            x: -dist,
            ease: 'none',
            scrollTrigger: {
                trigger: '.mwg_effect038 .pin-height', // We listen to .pin-height position
                pin: container, // We pin the container during the scroll distance
                start: 'top top',
                end: 'bottom bottom',
                scrub: true, // Animation follows scroll progress
                onUpdate: self => {
                    
                    // Determines the closest project based on scroll progress
                    const closestIndex = Math.round(self.progress * (numProjects - 1))
                    const closestProject = projects[closestIndex]
                    
                    // If the closest project has changed
                    if(closestProject !== currentProject) {
                        currentProject.classList.remove('on') // Remove active class from the previous project
                        closestProject.classList.add('on') // Add active class to the new project

                        // Set the new active project
                        currentProject = closestProject
                    }
                }
            }
        })
    })
})