window.addEventListener("DOMContentLoaded", () => {
    const medias = document.querySelectorAll('.mwg_effect017 .media')

    // Arrays to store GSAP quickTo functions for rotation
    const rotToX = []
    const rotToY = []

    // Initialize GSAP quickTo functions for smooth rotation animations
    medias.forEach(el => {
        rotToX.push(gsap.quickTo(el, 'rotationX', {duration: 1, ease: "elastic"}))
        rotToY.push(gsap.quickTo(el, 'rotationY', {duration: 1, ease: "elastic"}))
    })

    const mousePos = {x: 0, y: 0} // Object to track the mouse position
    window.addEventListener("mousemove", e => {
        // Update mouse position
        mousePos.x = e.clientX
        mousePos.y = e.clientY

        medias.forEach((el, index) => { // Loop through each media element
            const bound = el.getBoundingClientRect() // Get the element's bounding box (position and size)

            // Calculate the midpoint of the element
            let midpointX = bound.left + bound.width / 2
            let midpointY = bound.top + bound.height / 2

            // Determine rotation values based on mouse position
            let rotX = (mousePos.y - midpointY) / 15 // Rotation around X-axis
            let rotY = (mousePos.x - midpointX) / 15 // Rotation around Y-axis

            // Apply clamped rotation values with smoothing
            rotToX[index](gsap.utils.clamp(-70, 70, rotX) * -1)
            rotToY[index](gsap.utils.clamp(-70, 70, rotY))  
        })
    })
})