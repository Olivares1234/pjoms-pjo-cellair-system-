import React from 'react';
import { Table, Input } from 'antd';

const OrderedItemsTable = ({ data }) => {
  const columns = [
    {
      key: 'code',
      dataIndex: 'code',
      title: 'Code',
      align: 'center',

    },
    {
      key: 'mspecs',
      dataIndex: 'mspecs',
      title: 'Material Specs',
      align: 'center',

    },
    {
      key: 'totalDelivered',
      dataIndex: 'totalDelivered',
      title: 'Delivered',
      align: 'center',

    },
    {
      key: 'pendingDelivery',
      dataIndex: 'pendingDelivery',
      title: 'Pending',
      align: 'center',

    }
  ]
  return (
    <>
      <Table
        size="small"
        columns={columns}
        rowKey="id"
        dataSource={data}
        pagination={false}
        bodyStyle={{
          overflowX: 'auto',
        }}
      />
    </>
  )
}

export default OrderedItemsTable
