import { NotificationManager } from 'react-notifications'
import axios from 'axios'

const activateAccount = async activation_token => {
  try {
    const { status } = await axios.post('/user/activate', { activation_token })

    if (status === 201) {
      NotificationManager.success('Your account has been activated.', 'You may now log in using your email account.')
    }
  } catch (error) {
    NotificationManager.error(error.response.data.msg, 'Account activation failed.')
  }
}

export default activateAccount
