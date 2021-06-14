import gsap from 'gsap'

const sortAnimation = fn => {
  const tl = gsap.timeline()

  tl.to('.product-item', {
    autoAlpha: 0,
    duration: 0.5,
    onComplete: fn
  })
    .to('.product-item', {
      autoAlpha: 1,
      duration: 0.75
    })
    .set('.product-item', {
      clearProps: 'all'
    })
}

export default sortAnimation
