import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Cropper from 'react-easy-crop'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { ReactComponent as CloseIcon } from '../assets/icons/close.svg'
import { progress, getCroppedImg } from '../utils/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { closeUploadModal, updateAvatar } from '../redux/actions'
import { NotificationManager } from 'react-notifications'

const UploadModal = () => {
  const dispatch = useDispatch()
  const { uploadModal } = useSelector(({ ui }) => ui)

  const handleOnClose = () => {
    gsap.to('.upload-modal', {
      autoAlpha: 0,
      y: -30,
      duration: 0.2,
      ease: 'power4.out',
      onComplete: () => dispatch(closeUploadModal())
    })
  }

  const { isOpen, file, avatarId } = uploadModal

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const handleOnCropComplete = (_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleOnZoomChange = zoom => setZoom(zoom)

  const handleOnSave = async () => {
    progress(async () => {
      const croppedImage = await getCroppedImg(file, croppedAreaPixels)

      handleOnClose()

      await dispatch(
        updateAvatar({
          file: croppedImage,
          avatarId,
          callbackError: errMsg => NotificationManager.error(errMsg, 'Error', 3000)
        })
      )
    })
  }

  const uploadModalRef = useRef('')

  useEffect(() => {
    if (isOpen) {
      gsap.from('.upload-modal', {
        delay: 0.1,
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power3.in',
        y: -30
      })
    }
  }, [isOpen, file])

  return isOpen && file ? (
    <div className='upload-wrapper'>
      <div className='upload-modal' ref={uploadModalRef}>
        <header>
          <h3>Update profile image</h3>
          <CloseIcon onClick={handleOnClose} />
        </header>

        <div className='cropper-wrapper'>
          <Cropper
            classes='cropper'
            className='cropper'
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            cropShape='round'
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={handleOnCropComplete}
            onZoomChange={handleOnZoomChange}
          />
        </div>

        <Slider value={zoom} min={1} max={3} step={0.1} onChange={handleOnZoomChange} />

        <footer>
          <button className='close-btn' onClick={handleOnClose}>
            Close
          </button>
          <button className='dark-btn' onClick={handleOnSave}>
            Save
          </button>
        </footer>
      </div>
    </div>
  ) : null
}

export default UploadModal
