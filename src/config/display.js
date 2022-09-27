import { notification } from 'antd';
import { logout } from './token';
export const displayErrors = err => {

  if (err.response) {
    const { response: { status, data: { message, errors } } } = err;
    if (status === 401 || status === 404) {
      notification.error({
        message
      });

      if (status === 401 && message !== 'Invalid username or password') {
        notification.error({
          message: 'Session Expired! You will be logged out very soon!'
        })

        setTimeout(() => {
          logout(true);
        }, 500)
      }
    }

    if (status === 422) {
      errors.forEach(data => {
        notification.error({
          message: data
        });
      })
    }

    if (status === 500) {
      notification.error({
        message: 'Something wrong with the server!'
      })
    }


    if (status === 429) {
      notification.error({
        message: 'Too many request please wait for a while!'
      })
    }

  } else {
    notification.error({
      message: 'SERVER ERROR!'
    })
  }
}

export const displayNotification = (type, desc) => {
  notification[type]({
    message: type.toString().toUpperCase(),
    description: desc
  })
}