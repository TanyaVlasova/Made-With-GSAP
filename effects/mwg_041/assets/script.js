window.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.mwg_effect041 .item')

    items.forEach(item => {
        wrapLettersInSpan(item.querySelector('.hidden'))
        wrapLettersInSpan(item.querySelector('.visible'))

        item.addEventListener('mouseover', (e) => {
            
            if(!gsap.isTweening(item.querySelectorAll('.visible span')) && item.classList.contains('hovered')) {
                item.classList.remove('hovered')
            } 

            if(e.target.classList.contains('letter')) { // If a letter is hovered
                // Mark the item as hovered
                item.classList.add('hovered')
                // Get the index of the first hovered letter
                const indexHover = getChildIndex(e.target)

                gsap.to(item.querySelectorAll('.visible span'), {
                    yPercent: 100, // Moves each element vertically by 100% of its height
                    ease: 'back.out(2)', // Slight bounce at the end of the movement
                    duration: 0.6, // Total animation duration for each element
                    stagger: {
                        each: 0.023, // Delay between the start of each element's animation
                        from: indexHover // Sets the starting point for the stagger
                    }
                })
                gsap.to(item.querySelectorAll('.hidden span'), {
                    yPercent: 100, // Moves each element vertically by 100% of its height
                    ease: 'back.out(2)', // Slight bounce at the end of the movement
                    duration: 0.6, // Total animation duration for each element
                    stagger: {
                        each: 0.023, // Delay between the start of each element's animation
                        from: indexHover // Sets the starting point for the stagger
                    },
                    onComplete: () => {
                        // Reset items
                        gsap.set(item.querySelectorAll('.visible span'), {clearProps: 'all'})
                        gsap.set(item.querySelectorAll('.hidden span'), {clearProps: 'all'})
                    }
                })
            }
        })
    })
})

// UTIL METHODS
function wrapLettersInSpan(element) {
    const text = element.textContent;
    element.innerHTML = text
        .split('')
        .map(char => char === ' ' ? '<span>&nbsp;</span>' : `<span class="letter">${char}</span>`)
        .join('');
}
// Returns the index of the element relative to all its siblings
function getChildIndex(child) {
    return Array.from(child.parentNode.children).indexOf(child);
}