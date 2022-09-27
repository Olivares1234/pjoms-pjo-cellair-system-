import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <Result
      status="404"
      title="PAGE NOT FOUND"
      extra={<div>
        <Link to="/">Return home</Link>
      </div>}
    />
  )
}

export default Error
