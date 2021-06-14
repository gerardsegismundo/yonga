import { authAxios } from '../../utils/helpers'
import axios from 'axios'

export const login =
  ({ access_token }) =>
  dispatch => {
    dispatch({ type: 'LOGIN', payload: access_token })
  }

export const getCurrentUser = () => async dispatch => {
  try {
    const { data } = await authAxios.post('/auth/currentuser')

    dispatch({ type: 'GET_CURRENT_USER', payload: data.user })
  } catch (error) {
    console.error(error)
  }
}

export const refreshAccessToken = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/access_token')

    dispatch({ type: 'REFRESH_ACCESS_TOKEN', payload: data.access_token })
  } catch (error) {
    console.error(error)
  }
}

export const logout = () => async dispatch => {
  try {
    await authAxios.get('/auth/logout')
  } catch (error) {
    return console.error(error.response.data)
  }

  dispatch({ type: 'LOGOUT' })
}

export const updateUser = payload => async dispatch => {
  try {
    const { data } = await authAxios.post('/user/update', payload)

    console.log(data)

    dispatch({
      type: 'UPDATE_USER',
      payload: data
    })
  } catch (error) {
    console.error(error.response.data)
  }
}

export const updateAvatar =
  ({ file, avatarId: previousAvatarId, callbackError }) =>
  async dispatch => {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('previousAvatarId', previousAvatarId)

    try {
      const { data } = await authAxios.post(`/user/upload_avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      dispatch({
        type: 'UPDATE_AVATAR',
        payload: data
      })
    } catch (err) {
      if (err.response.data.msg) {
        callbackError(err.response.data.msg)
      }
    }
  }

export const deleteAccount =
  ({ avatarPublicId }) =>
  async dispatch => {
    try {
      await authAxios.delete(`/auth/${avatarPublicId}`)

      dispatch({ type: 'LOGOUT' })

      return true
    } catch (error) {
      console.log(error.response)
      return false
    }
  }
