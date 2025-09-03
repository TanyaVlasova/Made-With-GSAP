window.addEventListener("DOMContentLoaded", () => {

    document.addEventListener('wheel', () => {
        gsap.to('.scroll', {
            autoAlpha:0,
            duration:0.2,
        })
    }, {once: true})

    const root = document.querySelector('.mwg_effect014'),
        images = [],
        classes = ['format1', 'format2', 'format3', 'format4', 'format5']

    root.querySelectorAll('.medias img').forEach(image => {
        images.push(image.getAttribute('src'))
    })

    const imagesLength = images.length

    let incr = 0, 
        currentIndex = 0

    document.addEventListener('wheel', (e) => {
        incr += Math.abs(e.deltaY); // Math.abs() to ignore the scroll direction

        if (incr > 600) {
            newImage()
            incr = 0; // Reset incr value
        }
    }, {passive: true})

    function newImage() {
        // We pick a random value from the list of predefined classes
        const randomIndex = Math.floor(Math.random() * classes.length),
            // We create an image
            image = document.createElement("img")

        // We assign it a URL and add a randomly chosen class
        image.setAttribute('src', images[currentIndex])
        image.classList.add(classes[randomIndex])

        // We add this image to the DOM
        root.appendChild(image);

        gsap.fromTo(image, {
            xPercent: -50 + (Math.random() - 0.5) * 150,
            yPercent: -50 + (Math.random() - 0.5) * 30,
            rotation: (Math.random() - 0.5) * 20,
            // Different values for X and Y to create a slight squish effect on appearance
            scaleX: 1.05,
            scaleY: 1.2
        }, {
            scaleX:1,
            scaleY:1,
            ease:'power4.out',
            duration:0.15
        })

        gsap.to(image, {
            // Slightly reduce the image size
            scaleX:0.96,
            scaleY:0.96,
            ease:'power4.in',
            duration:0.15,
            delay:2, // Wait 2 seconds before hiding it
            onComplete:() => {
                // Remove the image from the DOM for better performance
                root.removeChild(image);
            }
        })
        
        // Loop back to the first item when we're out of range in our images array
        currentIndex = (currentIndex + 1) % imagesLength
    }
})