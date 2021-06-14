import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'
import { gsap } from 'gsap'

import 'react-notifications/lib/notifications.css'
import 'nprogress/nprogress.css'
import './sass/main.scss'
import axios from 'axios'

gsap.config({ nullTargetWarn: false })
axios.defaults.baseURL = '/api'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
