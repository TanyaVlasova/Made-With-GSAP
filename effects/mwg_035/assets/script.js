window.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector('.mwg_effect035 ul')
    const items = root.querySelectorAll('li')

    const heightResponsive = window.innerWidth > 768 ? 122 : 90

    let lastIndexEntered = 0

    const tls = []

    // For each row...
    items.forEach((item, index) => {

        // Get the media of the row
        const medias = item.querySelectorAll('.media')

        // Create a timeline() and set it to paused, except for the first row
        const tl = gsap.timeline({paused: index !== 0 ? true : false})
        tl.to(medias, {
            y: 0, // Center the media
            stagger: {
                each: 0.04, // Each media will appear every 0.04s
                from: "random" // In a random order
            },
            duration: 0.4,
            ease: 'power4.out'
        })
        
        tls.push(tl) // Add each timeline to an array

        item.addEventListener('mouseenter', () => {
            // Reverse the media of the previously active row
            tls[lastIndexEntered].timeScale(3).reverse()
            // Update the index of the last hovered row
            lastIndexEntered = index
            
            // Play the timeline of the new active row's media
            tls[index].timeScale(1).play()
            
            gsap.to(items, {
                flex: '1 1 45px', 
                duration: 0.2,
                ease: 'power2.inOut',
            })
            gsap.to(item, {
                flex: '1 1 ' + heightResponsive + 'px',
                duration: 0.2,
                ease: 'power2.inOut',
            })
        })
    })
})