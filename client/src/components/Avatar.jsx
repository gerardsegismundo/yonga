import { useSelector, useDispatch } from 'react-redux'

import { ReactComponent as Camera } from '../assets/icons/camera.svg'
import { openUploadModal } from '../redux/actions'

const Avatar = () => {
  const dispatch = useDispatch()

  const { url, public_id } = useSelector(({ user }) => user.data.avatar)

  const handleOnChange = e => {
    dispatch(
      openUploadModal({
        file: URL.createObjectURL(e.target.files[0]),
        avatarId: public_id
      })
    )
  }

  return (
    <div className='avatar'>
      {url && <img src={url} alt='avatar' />}
      <div className='input-group'>
        <label htmlFor='avatar' className='lb-2'>
          <Camera />
        </label>
        <input type='file' name='avatar' id='avatar' onChange={handleOnChange} />
      </div>
    </div>
  )
}

export default Avatar
