window.addEventListener("DOMContentLoaded", () => {

    const card = document.querySelector('.mwg_effect002 .card'),
        medias = document.querySelector('.mwg_effect002 .medias'),
        nbMedias = medias.querySelectorAll('.media').length,
        xTo = gsap.quickTo(card, "x", {duration: 1, ease: "power4"}),
        yTo = gsap.quickTo(card, "y", {duration: 1, ease: "power4"}),
        rotationTo = gsap.quickTo(card, "rotation", {duration: 1, ease: "power4"}),
        xToMedias = gsap.quickTo(medias, "xPercent", {duration: 0.6, ease: "power2"}),
        yToMedias = gsap.quickTo(medias, "yPercent", {duration: 0.7, ease: "power2"}),
        W = window.innerWidth,
        H = window.innerHeight

    medias.querySelector('.media').classList.add('on')

    // gsap.set(card, {xPercent: -50, yPercent: -50});

    let isMoving,
        oldPosX = 0,
        oldPosY = 0,
        incr = 0,
        index = 0


    window.addEventListener("mousemove", e => {
        // e.clientX returns the horizontal position on the screen
        // e.clientY returns the vertical position on the screen

        const posX = e.clientX,
            posY = e.clientY

        
        // Delta on x and y relative to the previous iteration
        // Divided by two to reduce the amplitude
        const valueX = (posX - oldPosX)/2,
            valueY = (posY - oldPosY)/2

        // Return the clamp values
        const clampValueX = gsap.utils.clamp(-8, 8, valueX),
            clampValueY = gsap.utils.clamp(-8, 8, valueY)

        // We calculate the difference between the current position and the previous one 
        // Divided by 4 to reduce the rotation amplitude
        rotationTo((posX - oldPosX) / 4)
        xTo(posX - W/2)
        yTo(posY - H/2 + window.scrollY)

        // In the opposite direction of the cursor movement
        xToMedias(-clampValueX)
        yToMedias(-clampValueY)

        // Update for the next iteration
        oldPosX = posX
        oldPosY = posY

        // Add the positive values of the deltas from the previous step
        incr += Math.abs(valueX) + Math.abs(valueY)
        if(incr > 300) {
            // Reset the incr variable
            incr = 0

            // Hide the active image
            document.querySelector('.media.on').classList.remove('on')

            // Display the next media
            document.querySelectorAll('.media')[index % nbMedias].classList.add('on')
            index++ // Increment the index for the next call
        }

        window.clearTimeout( isMoving );
        isMoving = setTimeout( () => {
            rotationTo(0)
            xToMedias(0)
            yToMedias(0)
        }, 66);
    })

})