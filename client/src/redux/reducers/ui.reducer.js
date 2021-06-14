const initialState = {
  navMenuIsOpen: false,
  cartMenuIsOpen: false,
  darkOverlayIsOpen: true,
  uploadModal: {
    isOpen: false,
    file: null,
    avatarId: ''
  },
  confirmModal: {
    msg: '',
    args: {},
    onDelete: '',
    isOpen: false
  }
}

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOGGLE_NAV_MENU':
      return {
        ...state,
        navMenuIsOpen: !state.navMenuIsOpen
      }

    case 'TOGGLE_CART_MENU':
      return {
        ...state,
        cartMenuIsOpen: !state.cartMenuIsOpen
      }

    case 'OPEN_UPLOAD_MODAL':
      return {
        ...state,
        uploadModal: {
          isOpen: true,
          file: payload.file,
          avatarId: payload.avatarId
        }
      }

    case 'CLOSE_UPLOAD_MODAL':
      return {
        ...state,
        uploadModal: {
          isOpen: false,
          file: null
        }
      }

    case 'OPEN_CONFIRM_MODAL':
      const { msg, onDelete, args } = payload

      return {
        ...state,
        confirmModal: {
          msg,
          onDelete,
          args,
          isOpen: true
        }
      }

    case 'CLOSE_CONFIRM_MODAL':
      return {
        ...state,
        confirmModal: {
          isOpen: false
        }
      }

    case 'TOGGLE_DARK_OVERLAY':
      return {
        ...state,
        darkOverlayIsOpen: !state.darkOverlayIsOpen
      }

    default:
      return state
  }
}

export default uiReducer
