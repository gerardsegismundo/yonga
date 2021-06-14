import NProgress from 'nprogress'

const progress = fn => {
  NProgress.start()

  fn()
  NProgress.done(true)
}

export default progress
