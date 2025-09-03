window.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector('.mwg_effect030')
    const listElement = root.querySelector('.mwg_effect030 ul')
    const rows = listElement.querySelectorAll('li')
    const mediaContainer = root.querySelector('.mwg_effect030 .media-container')

    const mediasUrl = []
    root.querySelectorAll('.medias img').forEach(img => {
        mediasUrl.push(img.getAttribute('src'))
    })

    listElement.addEventListener('mouseenter', () => {
        mediaContainer.classList.add('on') // I display the container on hover of the list
    })
    listElement.addEventListener('mouseleave', () => {
        mediaContainer.classList.remove('on') // I hide the container
        Array.from(mediaContainer.children).forEach(el => {
            el.remove() // I empty the content of media-container
        })
    })
    
    gsap.set(mediaContainer, {yPercent: -50})

    // yTo is attached to the y property of media-container
    const yTo = gsap.quickTo(mediaContainer, 'y', {
        duration: 0.5, // Duration of the update of the y value
        ease: 'power4' // Non-linear update
    })
    
    listElement.addEventListener('mousemove', (e) => {
        yTo(e.clientY + window.scrollY)
    })

    rows.forEach((row, index) => {
        row.addEventListener('mouseenter', () => {
            createMedia(index)
        })
    })
    
    function createMedia(index) {
        let div = document.createElement("div")
        let image = document.createElement("img")

        image.src = mediasUrl[index] // Url corresponding to the index parameter
        div.appendChild(image) // The created image becomes the child of div
        mediaContainer.appendChild(div) // The div created becomes the child of media-container

        gsap.to([div, image], {
            y: 0, // Move both elements to 0
            duration: 0.6, // During 0.6s
            ease:'expo.inOut' // With an expo ease
        })

        if(mediaContainer.children.length > 20) {
            // I target the first image in the container and remove it from the DOM
            mediaContainer.children[0].remove()
        }
    }
})