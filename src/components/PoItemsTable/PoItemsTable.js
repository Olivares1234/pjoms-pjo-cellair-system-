import React from "react";
import { Table, Button, Tooltip } from "antd";

const PoItemsTable = (props) => {
  const {
    openItems,
    openItemsLength,
    onPageChange,
    onSizeChange,
    openModal,
    paginate,
  } = props;

  const columns = [
    {
      key: "createJo",
      width: "2%",
      align: "center",
      render: (data) => (
        <Tooltip placement="right" title="Add job order">
          <Button
            size="small"
            onClick={() => openModal(data)}
            className="bl-cl"
            icon="form"
          ></Button>
        </Tooltip>
      ),
    },
    {
      key: "quantity",
      title: "J.O / Quantity",
      align: "center",
      render: (data) => {
        return {
          props: {
            style: {
              maxWidth: "100px",
            },
          },
          children: `${data.totalJoQty} / ${data.quantity}`,
        };
      },
    },
    {
      key: "customer",
      title: "Customer",
      align: "center",
      render: (data) => {
        return {
          props: {
            style: {
              maxWidth: "140px",
            },
          },
          children: data.customer,
        };
      },
    },
    {
      key: "po",
      dataIndex: "po_num",
      title: "Purchase Order",
      width: "10%",
      align: "center",
    },
    {
      key: "code",
      dataIndex: "code",
      title: "Code",
      align: "center",
    },
    {
      key: "itemdesc",
      title: "Item Description",
      align: "center",
      render: (data) => {
        return {
          props: {
            style: {
              maxWidth: "190px",
            },
          },
          children: data.itemdesc,
        };
      },
    },
    {
      key: "deliverydate",
      dataIndex: "deliverydate",
      title: "Delivery Date",
      align: "center",
    },
  ];

  return (
    <Table
      size="small"
      bodyStyle={{ overflowX: "auto" }}
      bordered
      columns={columns}
      dataSource={openItems}
      rowKey="item_id"
      pagination={{
        total: openItemsLength,
        current: paginate.page,
        pageSize: paginate.pageSize,
        defaultPageSize: paginate.pageSize,
        showSizeChanger: true,
        onChange: onPageChange,
        onShowSizeChange: onSizeChange,
        pageSizeOptions: ["10", "15", "25"],
        showTotal: (total, range) =>
          `Showing ${range[0]}-${range[1]} of ${total} items`,
        position: "both",
      }}
    />
  );
};

export default PoItemsTable;
