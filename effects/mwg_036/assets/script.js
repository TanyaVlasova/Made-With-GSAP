window.addEventListener("DOMContentLoaded", () => {

    const root = document.querySelector('.mwg_effect036')

    const mediasUrl = []

    root.querySelectorAll('.medias img').forEach(el => {
        mediasUrl.push(el.getAttribute('src'))
    })

    const hovers = root.querySelectorAll('.sentence .hover')
    hovers.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Calculate the coordinates of the middle of the word
            const bound = el.getBoundingClientRect()
            const distX = bound.left + bound.width / 2
            const distY = bound.top + bound.height / 2 + window.scrollY

            // Pass the coordinates to the function to display images
            displayImages(distX, distY)
        })
        el.addEventListener('mouseleave', () => {
            // Stop the scrolling of images
            stopImages()
        })
    })

    let interval, incr = 0
    function displayImages(distX, distY) {
        interval = setInterval(() => {
            // Create an image
            let image = document.createElement("img")
            // Assign it a URL
            image.src = mediasUrl[incr % mediasUrl.length]
            // Add this image to the DOM
            root.appendChild(image);

            gsap.fromTo(image, {
                // Move the image backward by half its size so it’s centered
                xPercent: -50,
                yPercent: -50,
                x: distX + (Math.random() - 0.5) * 50,
                y: distY + 50, // Second parameter + 50px offset
                rotation: (Math.random() - 0.5) * 10
            }, {
                y: distY, // Cancel the 50px distance: move upwards as it appears
                rotation: (Math.random() - 0.5) * 10,
                ease:'back.out(3)',
                duration: 0.4,
            })

            gsap.to(image, {
                scale: 0.9,
                delay: 0.5, // Wait half a second before playing the animation
                duration: 0.2,
                ease:'back.in(2)',
                onComplete: () => {
                    root.removeChild(image) // Image is removed from the DOM
                }
            })

            incr++
        }, 150)
    }

    function stopImages() {
        clearInterval(interval)
    }
})