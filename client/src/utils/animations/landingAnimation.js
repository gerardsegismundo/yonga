import { gsap } from 'gsap'
const tl = gsap.timeline()

// const store = configureStore()
// store.dispatch(toggleDa)

const landingAnimation = () =>
  tl
    .to('.dark-overlay', {
      delay: 0.4,
      duration: 1,
      autoAlpha: 0,
      ease: 'power4.in',
      onComplete: () => gsap.to('body', { css: { overflowY: 'auto' } })
    })
    .from(
      '.flower-img, .text-wrapper',
      {
        autoAlpha: 0,
        y: -55,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.5
      },
      1
    )
    .from('.text-wrapper h2, .text-wrapper h3, .text-wrapper span', {
      autoAlpha: 0,
      y: -15,
      // ease: 'power2.in',
      duration: 0.3,
      stagger: 0.5
    })

export default landingAnimation
