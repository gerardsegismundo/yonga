export const toggleNavMenu = () => dispatch => {
  dispatch({ type: 'TOGGLE_NAV_MENU' })
}

export const toggleCartMenu = () => dispatch => {
  dispatch({ type: 'TOGGLE_CART_MENU' })
}

export const openUploadModal = ({ file, avatarId }) => dispatch => {
  dispatch({
    type: 'OPEN_UPLOAD_MODAL',
    payload: { file, avatarId }
  })
}

export const openConfirmModal = ({ msg, onDelete, args }) => dispatch => {
  dispatch({
    type: 'OPEN_CONFIRM_MODAL',
    payload: { msg, onDelete, args }
  })
}

export const closeUploadModal = () => dispatch => {
  dispatch({ type: 'CLOSE_UPLOAD_MODAL' })
}

export const closeConfirmModal = () => dispatch => {
  dispatch({ type: 'CLOSE_CONFIRM_MODAL' })
}

export const toggleDarkOverlay = () => dispatch => {
  dispatch({ type: 'TOGGLE_DARK_OVERLAY' })
}
