import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { redirect_path } from '../../config/config';

function Title({ title }) {
  const pathname = useLocation().pathname;
  return (
    <div style={{ width: '100%', borderBottom: '1px solid #1890ff', paddingBottom: 8 }}>
      <Link
        to={redirect_path}
        style={{ marginRight: 4, fontSize: 15, textTransform: 'uppercase' }}
      >
        Dashboard &gt;
        </Link>
      <Link to={pathname} style={{ textTransform: 'uppercase' }}>{title}</Link>
    </div>
  )
}

export default Title
