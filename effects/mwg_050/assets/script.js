gsap.registerPlugin(Observer)

// I position the animation at an advanced state on the timeline, keeping a base of 8 (8 images) to never reach the beginning
let incr = 800000, zIndex = 0, newIndex = 0
const settings = {delta:0}

window.addEventListener("DOMContentLoaded", () => {
    const medias = []
    const realImages = document.querySelectorAll('.mwg_effect050 .real-image')

    document.querySelectorAll('.mwg_effect050 .medias img').forEach(img => {
        medias.push(img.getAttribute('src'))
    })

    realImages.forEach(image => {
        image.setAttribute('data-index', zIndex)
        image.setAttribute('src', medias[zIndex % medias.length])
        zIndex++
    })

    const deltaTo = gsap.quickTo(settings, 'delta', { 
        duration: 2, 
        ease: "power1",
        onUpdate: () => {
            incr += settings.delta // Add the current delta value
            tl.time(incr) // Update the progression of the future timeline
        }
     })

   const tl = gsap.timeline({
        paused: true
    })

    tl.to(realImages, {
        scale: 1.005, // 1.005 instead of 1 to prevent tiny jump on the edge when complete
        ease: "expo.inOut",
        duration: 8,
        stagger: {
            each: 1, // 1 * 8 images = 8 = duration
            repeat: -1, // Infinite repetition
            onRepeat() {
                const el = this.targets()[0]
                const movingForward = settings.delta >= 0 // Direction detection
                
                // Update the global zIndex
                zIndex += movingForward ? 1 : -1
                
                // If moving forward: use the zIndex directly
                // If moving backward: decrease its z-index by 8 to send it to the back
                el.style.zIndex = movingForward ? zIndex : zIndex - (realImages.length - 1)
                
                // Select the reference element and calculate the new index
                // If moving forward: take the previous element (or last one if at the beginning)
                // If moving backward: take the next element (or first one if at the end)
                const referenceEl = movingForward 
                    ? el.previousElementSibling || realImages[realImages.length - 1]
                    : el.nextElementSibling || realImages[0]
                    
                // Use the mod function to ensure the index stays within the image array limits
                newIndex = mod(
                    parseInt(referenceEl.getAttribute('data-index')) + (movingForward ? 1 : -1),
                    medias.length
                )
                
                // Update attributes
                // Store the index for future calculations
                el.setAttribute('data-index', newIndex)
                el.setAttribute('src', medias[newIndex])
            }
        }
    }).time(incr) // Set the progress to the value of "incr"

    Observer.create({
        target: window, // The element on which we listen for events (here, the window)
        type: "wheel,touch", // Listens for both scroll (wheel) and touch (swipe) events
        onChange: (e) => {
            // If it's a touch movement ("touchmove"), the divider is smaller to adjust sensitivity
            const divider = e.event.type === "touchmove" ? 500 : 1000
            deltaTo(e.deltaY / divider)
        },
        onStop: () => {
            // When the user stops scrolling, reset deltaTo to 0
            deltaTo(0)
        }
    })
})

//UTIL METHOD
const mod = (n, m) => (n % m + m) % m