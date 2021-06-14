import axios from 'axios'

import store from '../../redux/store'
import { refreshAccessToken } from '../../redux/actions'

const authAxios = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: '/api'
})

authAxios.interceptors.request.use(
  config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`

    return config
  },
  err => Promise.reject(err)
)

authAxios.interceptors.response.use(
  res => {
    return res
  },
  async err => {
    const originalRequest = err.config

    if (err.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      await store.dispatch(refreshAccessToken())
      return authAxios(originalRequest)
    }

    return Promise.reject(err)
  }
)

export default authAxios
