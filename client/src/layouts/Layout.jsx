import { useDispatch } from 'react-redux'
import { NotificationContainer } from 'react-notifications'

import DarkOverlay from './DarkOverlay'
import NavMenu from './NavMenu'
import Header from './Header'
import Footer from './Footer'

import UploadModal from '../components/UploadModal'
import ConfirmModal from '../components/ConfirmModal'
import { deleteComment, deleteAccount } from '../redux/actions'

const Layout = ({ children }) => {
  const dispatch = useDispatch()

  return (
    <>
      <UploadModal />
      <ConfirmModal
        deleteManager={{
          DELETE_COMMENT: args => dispatch(deleteComment(args)),
          DELETE_ACCOUNT: args => dispatch(deleteAccount(args))
        }}
      />
      <NotificationContainer />
      <DarkOverlay />
      <Header />

      <NavMenu />
      <div className='page-wrapper'>{children}</div>
      <Footer />
    </>
  )
}

export default Layout
