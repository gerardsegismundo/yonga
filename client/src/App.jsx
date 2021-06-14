import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import { of, fromEvent, animationFrameScheduler } from 'rxjs'
import { distinctUntilChanged, filter, map, pairwise, switchMap, throttleTime } from 'rxjs/operators'
import { useObservable } from 'rxjs-hooks'

import Layout from './layouts/Layout'

import useResponsiveVH from './utils/hooks/useResponsiveVH'
import { progress } from './utils/helpers'
import { landingAnimation } from './utils/animations'

import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, getProducts } from './redux/actions'
import Routes from './components/Routes'

const tl = gsap.timeline()

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const { navMenuIsOpen, cartMenuIsOpen } = useSelector(({ ui }) => ui)

  const watchScroll = () =>
    of(typeof window === 'undefined').pipe(
      filter(bool => !bool),
      switchMap(() => fromEvent(window, 'scroll', { passive: true })),
      throttleTime(0, animationFrameScheduler),
      map(() => window.pageYOffset),
      pairwise(),
      map(([previous, current]) => (current < previous ? 'Up' : 'Down')),
      distinctUntilChanged()
    )

  const scrollDirection = useObservable(watchScroll, 'Up')

  const fetchProductsRef = useRef(() => dispatch(getProducts()))

  const getCurrentUserRef = useRef(() => {
    progress(() => dispatch(getCurrentUser(localStorage.access_token)))
  })

  useEffect(() => {
    fetchProductsRef.current()

    gsap.to('body', { css: { visibility: 'visible' } })

    landingAnimation()
  }, [])

  useEffect(() => {
    if (localStorage.access_token && user.isAuthenticated) {
      getCurrentUserRef.current()
    }
  }, [user.isAuthenticated])

  useResponsiveVH()

  useEffect(() => {
    if (!navMenuIsOpen && !cartMenuIsOpen) {
      const params = scrollDirection === 'Up' ? [1, 0.3, 0] : [0, 0.3, -50]

      const animateHeader = ([autoAlpha, duration, y]) => {
        tl.to('.main-header', { autoAlpha, duration, y })
      }

      animateHeader(params)
    }
  }, [cartMenuIsOpen, navMenuIsOpen, scrollDirection])

  return (
    <Layout>
      <Routes />
    </Layout>
  )
}

export default App
