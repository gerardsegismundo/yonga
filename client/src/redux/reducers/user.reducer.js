const initialState = {
  isAuthenticated: false,
  access_token: '',
  data: null
}

if (localStorage.access_token) {
  initialState.access_token = localStorage.getItem('access_token')
  initialState.isAuthenticated = true
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      localStorage.setItem('access_token', payload)

      return {
        ...state,
        isAuthenticated: true,
        access_token: payload
      }

    case 'GET_CURRENT_USER': {
      return {
        ...state,
        data: { ...payload }
      }
    }

    case 'REFRESH_ACCESS_TOKEN':
      localStorage.setItem('access_token', payload)

      return {
        ...state,
        access_token: payload
      }

    case 'LOGOUT':
      localStorage.removeItem('access_token')

      return {
        ...state,
        access_token: '',
        isAuthenticated: false,
        data: {}
      }

    case 'UPDATE_USER':
      return {
        ...state,
        data: { ...state.data, ...payload.user }
      }

    case 'UPDATE_AVATAR':
      return {
        ...state,
        data: {
          ...state.data,
          avatar: { ...payload }
        }
      }

    default:
      return state
  }
}

export default userReducer
