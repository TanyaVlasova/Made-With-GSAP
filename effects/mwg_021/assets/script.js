const images = []
const root = document.querySelector('.mwg_effect021')
root.querySelectorAll('.medias img').forEach(image => {
    images.push(image.getAttribute('src'))
})

let incr = 0, 
    oldIncr = 0, 
    firstMove = true, 
    resetDist = window.innerWidth / 15, 
    indexImg = 0

window.addEventListener("DOMContentLoaded", () => {
    root.addEventListener("mousemove", e => {
        const val = e.clientX

        // Prevent first jump reveal image behavior
        if(firstMove) {
            firstMove = false
            oldIncr = val
            return
        }
        
        // Add the positive difference between the last two positions
        incr += Math.abs(val - oldIncr)
        oldIncr = val

        if(incr > resetDist) {
            incr = 0 // Reset the variable
            createMedia(e.clientX, e.clientY - root.getBoundingClientRect().top)
        }
    })
})


function createMedia(x, y) {
    // Create an image element and set its source to the current item in the images array
    const image = document.createElement("img")
    image.setAttribute('src', images[indexImg])

    // Add the image to the DOM
    root.appendChild(image)

    const tl = gsap.timeline({
        onComplete: () => {
            // Remove the image from the DOM when the timeline finishes
            root.removeChild(image);
            tl && tl.kill()
        }
    })

    tl.fromTo(image, {
        // Set the image at the current cursor position
        x,
        y,
        // Add some randomness
        yPercent:-50 + (Math.random() - 0.5) * 10,
        xPercent:-50 + (Math.random() - 0.5) * 80,
        rotation:(Math.random() - 0.5) * 20,
        // Start with a larger size
        scaleX: 1.3,
        scaleY: 1.3
    }, {
        // End at the image's normal size
        scaleX:1,
        scaleY:1,
        ease: 'elastic.out(2, 0.6)',
        duration: 0.6
    })
    tl.to(image, {
        duration: 0.3,
        scale: 0.5,
        delay: 0.1,
        ease:'back.in(1.5)'
    })

    // Loop back to the first item when we're out of range in our images array
    indexImg = (indexImg + 1) % images.length
}