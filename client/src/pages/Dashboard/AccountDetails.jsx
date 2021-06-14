import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { openConfirmModal } from '../../redux/actions'

const AccountDetails = () => {
  const dispatch = useDispatch()

  const { access_type: accessType, avatar } = useSelector(({ user }) => user.data)

  const handleOnDelete = () => {
    dispatch(
      openConfirmModal({
        msg: {
          confirmation: 'Are you sure you want to delete your account?',
          success: {
            title: 'Success!',
            body: 'Your account has been deleted.'
          },
          error: {
            title: 'Failed!',
            body: 'Oops something went wrong. Please try again later.'
          }
        },
        onDelete: 'DELETE_ACCOUNT',
        args: { avatarPublicId: avatar.public_id || 'avatars' }
      })
    )
  }

  return (
    <div className='account-details'>
      <h2>{accessType} Account</h2>
      <p className='note'>Edit your account details</p>

      {accessType === 'local' && (
        <Link to='/account/resetpassword' className='btn dark-btn'>
          Reset password
        </Link>
      )}

      <button className='btn dark-btn' onClick={handleOnDelete}>
        Delete Account
      </button>
    </div>
  )
}

export default AccountDetails
