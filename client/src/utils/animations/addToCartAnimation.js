import { gsap } from 'gsap'

const addToCartAnimation = e => {
  const tl = gsap.timeline()

  const addedNotification = e.currentTarget.parentNode.nextSibling.firstChild
  const checkCartIcon =
    e.currentTarget.parentNode.nextSibling.firstChild.nextSibling

  tl.to(e.currentTarget, {
    duration: 0,
    autoAlpha: 0
  })
    .to(checkCartIcon, {
      y: -10,
      maxHeight: '2rem',
      duration: 0
    })
    .to(checkCartIcon, {
      autoAlpha: 0.8,
      duration: 0.3
    })
    .to(addedNotification, {
      autoAlpha: 1,
      duration: 0.1,
      delay: 0.1,
      y: -2.5
    })
    .to(e.currentTarget, {
      y: 30,
      duration: 0,
      delay: 0.5
    })

  gsap.set([e.currentTarget, checkCartIcon, addedNotification], {
    clearProps: 'all',
    delay: 1.75
  })
}

export default addToCartAnimation
