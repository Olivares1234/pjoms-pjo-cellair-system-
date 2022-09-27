import React from 'react';
import moment from 'moment';

function Footer() {
  return (
    <div style={{ textAlign: 'center', lineHeight: 0, margin: '15px 0 30px 0' }}>
      <p>{process.env.REACT_APP_PROJECT_NAME || 'No Env Project name'} {process.env.REACT_APP_VERSION || '1.0.0'}</p>
      <small>&copy; {moment().format("YYYY")}</small>
    </div>
  )
}

export default Footer
