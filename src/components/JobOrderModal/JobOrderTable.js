import React from 'react';
import { Table, Icon, Button, Tooltip } from 'antd';

const JobOrderTable = props => {

  const {
    joList,
    joListLength,
    paginate,
    onPageChange,
    onSizeChange,
    openModal,
    deleteJo,
    setLoading,
    setSelectedJo,
    isSelectingItem
  } = props;

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedJo({
        selectedRowKeys
      })
    }
  };

  const columns = [
    {
      key: 'editJo',
      render: data => data.hasPr || data.producedQty > 0 ? <Icon type="ellipsis" /> :
        <Tooltip title="Edit job order" placement="right">
          <Button
            onClick={() => openModal(data, 'EDITJO')}
            className="bl-cl"
            size="small"
            icon="edit"></Button>
        </Tooltip>,
      align: 'center'
    },
    {
      key: 'deleteJo',
      render: data => data.hasPr || data.producedQty > 0 ? <Icon type="ellipsis" /> :
        <Tooltip title="Delete job order" placement="right">
          <Button
            className="red-cl"
            size="small"
            onClick={() => openModal({ ...data, deleteJo, setLoading }, 'CANCELJO')}
            icon="delete"></Button>
        </Tooltip>,
      align: 'center'
    },
    {
      key: 'viewProduced',
      render: data =>
        <Tooltip title="View produced quantity" placement="right">
          <Button
            className="bl-cl"
            size="small"
            onClick={() => openModal(
              {
                id: data.id,
                jo_num: data.jo_num,
                remainingQty: data.quantity - data.producedQty
              }, 'VIEWPRODUCED')}
            icon="carry-out"></Button>
        </Tooltip>,
      align: 'center'
    },
    // {
    //   key: 'PR',
    //   title: 'PR',
    //   align: 'center',
    //   render: data => {
    //     if (data.forwardToWarehouse) {
    //       if (data.hasPr)
    //         return <Tooltip title="With purchase requisition" placement="right"  >
    //           <Icon className="gr-cl" type="check-circle" />
    //         </Tooltip>;
    //       else
    //         return <Tooltip title="Pending purchase requisition" placement="right"  >
    //           <Icon className="bl-cl" type="clock-circle" />
    //         </Tooltip>;
    //     } else
    //       return <Tooltip title="No purchase requisition request" placement="right"  >
    //         <Icon type="ellipsis" />
    //       </Tooltip>
    //   }
    // },
    {
      key: 'status',
      title: 'Status',
      align: 'center',
      render: data => {

        const color = data.status === 'OPEN' ? '#27ae60' : '#218c74';
        return <div style={{ color, fontWeight: 600 }}>
          {data.status}
        </div>
      }
    },
    {
      key: 'servedQty',
      title: 'Served / Qty',
      align: 'center',
      render: data => <div>{data.producedQty} / {data.quantity}</div>
    },
    {
      key: 'customer',
      dataIndex: 'customer',
      title: 'Customer',
      align: 'center'
    },
    {
      key: 'jo_num',
      dataIndex: 'jo_num',
      title: 'Job Order',
      align: 'center'
    },
    {
      key: 'poNum',
      dataIndex: 'poNum',
      title: 'Purchase Order',
      align: 'center'
    },
    {
      key: 'date_issued',
      dataIndex: 'date_issued',
      title: 'Date issued',
      align: 'center'
    },
    {
      key: 'date_needed',
      dataIndex: 'date_needed',
      title: 'Date needed',
      align: 'center'
    },
    {
      key: 'itemDesc',
      dataIndex: 'itemDesc',
      title: 'Item Description',
      align: 'center'
    },
    {
      key: 'code',
      dataIndex: 'code',
      title: 'Code',
      align: 'center'
    },
  ]

  return (
    <Table
      style={{ marginTop: 10 }}
      bodyStyle={{ overflowX: 'auto' }}
      columns={columns}
      bordered={true}
      dataSource={joList}
      size="small"
      pagination={{
        total: joListLength,
        current: paginate.page,
        pageSize: paginate.pageSize,
        defaultPageSize: paginate.pageSize,
        showSizeChanger: true,
        onChange: onPageChange,
        onShowSizeChange: onSizeChange,
        pageSizeOptions: ['10', '25', '50', '100', '500'],
        showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,
        position: "both"
      }}
      rowKey="id"
      rowSelection={isSelectingItem ? rowSelection : null}
    />
  )
}

export default JobOrderTable
