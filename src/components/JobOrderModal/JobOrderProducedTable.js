import React from 'react';
import { Table, Button } from 'antd';
import Confirm from '../Confirm';

const JobOrderProducedTable = props => {
  const {
    joProduced,
    deleteJoProducedQty,
    setLoading,
    remainingQty,
    setRemaining } = props;

  const columns = [
    {
      key: "delete",
      width: '2%',
      align: 'center',
      render: data => {
        return <Button
          onClick={() => {
            const newQty = remainingQty + data.quantity;
            Confirm(deleteJoProducedQty, null, data.id, newQty, setRemaining, setLoading)
          }}
          size="small"
          className="red-cl"
          icon="delete"></Button>
      },
    },
    {
      key: "quantity",
      dataIndex: "quantity",
      title: "Quantity",
      align: 'center'
    },
    {
      key: "date",
      dataIndex: "date",
      title: "Date",
      align: 'center'
    },
    {
      key: "remarks",
      dataIndex: "remarks",
      title: "Remarks",
      align: 'center'
    }
  ]

  return (
    <Table
      size="small"
      bordered={true}
      dataSource={joProduced}
      columns={columns}
      rowKey="id"
    />
  )
}

export default JobOrderProducedTable
