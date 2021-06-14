import gsap from 'gsap/gsap-core'

const fadeBillingDetails = fn => {
  const tl = gsap.timeline()

  tl.to('.billing-details--input-group', {
    autoAlpha: 0,
    duration: 0.5,
    onComplete: fn
  })
    .to('.billing-details--input-group', {
      autoAlpha: 1,
      duration: 0.75
    })
    .set('.billing-details--input-group', {
      clearProps: 'all'
    })
}

export default fadeBillingDetails
