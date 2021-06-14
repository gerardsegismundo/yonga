import { useEffect } from 'react'

const useCartToggleAnimation = tl => {
  useEffect(() => {
    tl.from('.cart-menu', {
      y: -5,
      duration: 0.3,
      autoAlpha: 0
    }).reverse()
  }, [tl])
}

export default useCartToggleAnimation
