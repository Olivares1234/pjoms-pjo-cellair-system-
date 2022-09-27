import React, { Fragment, lazy, useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../config/config';
import { displayErrors } from '../config/display';
import { headers } from '../config/token';
import Layout from '../layout/Layout';
import { Input } from 'antd';

const Logs = lazy(() => import('../components/Logs/Logs'));
const LogsView = props => {
  const [logs, setLogs] = useState({ data: [], size: 0 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState({ page: 1, pageSize: 10 });
  const { page, pageSize } = paginate;
  useEffect(() => {
    loadData(page, pageSize);
  }, []);

  const onPageChange = page => {
    setPaginate({ ...paginate, page: page });
    loadData(page, pageSize);
  }

  const onSizeChange = (page, pageSize) => {
    setPaginate({ page, pageSize });
    loadData(page, pageSize);
  }

  const loadData = (page, pageSize) => {
    setLoading(true);

    let search_params = '';
    if (search !== '' || search !== null) {
      search_params = '&search=' + search;
    }

    axios.get(API + `pjoms/logs?page=${page}&pageSize=${pageSize}${search_params}`, headers())
      .then(res => {
        const { logs, logsLength } = res.data;
        setLogs({
          data: logs,
          size: logsLength
        });
        setLoading(false);

      })
      .catch(err => displayErrors(err));
  }
  return (
    <Fragment>
      <br />
      <h2>Logs</h2>
      <Input.Search
        style={{ marginBottom: 10, width: '30%' }}
        placeholder="Search here..."
        onChange={e => setSearch(e.target.value)}
        onSearch={() => loadData(page, pageSize)}
      />
      <Logs
        loading={loading}
        logs={logs.data}
        size={logs.size}
        paginate={paginate}
        onPageChange={onPageChange}
        onSizeChange={onSizeChange}
      />
    </Fragment>
  )
}

export default Layout(LogsView)
