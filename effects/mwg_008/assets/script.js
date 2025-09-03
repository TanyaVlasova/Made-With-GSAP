gsap.registerPlugin(Observer)

let total = 0,
    xTo,
    itemValues = []

window.addEventListener("DOMContentLoaded", () => {

    const content = document.querySelector('.mwg_effect008 .container')
    const cards = document.querySelectorAll('.mwg_effect008 .card')
    const cardsLength = cards.length / 2
    const half = content.clientWidth / 2

    const wrap = gsap.utils.wrap(-half, 0);

    xTo = gsap.quickTo(content, "x", {
        duration: 0.5, // Will transition over 0.5s
        ease: 'power3', // Non-linear
        modifiers: {
            x: gsap.utils.unitize(wrap),
        },
    });

    // Generate an array of random values between -10 and 10
    for (let i = 0; i < cardsLength; i++) {
        itemValues.push((Math.random() - 0.5) * 20);
    }

    // Create a GSAP timeline and keep it paused initially
    const tl = gsap.timeline({ paused: true });
    tl.to(cards, {
        // Rotate each card using a precomputed random value
        rotate: (index) => (itemValues[index % cardsLength]),
        // Move each card horizontally based on the same random value
        xPercent: (index) => (itemValues[index % cardsLength]),
        // Move each card vertically based on the same random value
        yPercent: (index) => (itemValues[index % cardsLength]),
        // Slightly scale down the cards
        scale: 0.95,
        duration: 0.5,
        ease: 'back.inOut(3)', // Non-linear
    })

    Observer.create({
        target: content,
        type: "pointer,touch", // Detect both pointer and touch events
        onPress: () => tl.play(), // Play the timeline when pressing down
        onDrag: (self) => { // Update the horizontal position while dragging
            total += self.deltaX
            xTo(total)
        },
        onRelease: () => { // Reverse the timeline when releasing the pointer
            tl.reverse()
        },
        onStop: () => { // Reverse the timeline when the interaction stops
            tl.reverse()
        },
    })

    gsap.ticker.add(tick);

    // TO GO FURTHER: You can add an offscreen check and kill Observer when necessary
});

function tick(time, deltaTime) {
    total -= deltaTime / 10  // Adjust the speed of automatic scrolling    
    xTo(total)
}