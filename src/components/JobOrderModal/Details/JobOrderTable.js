import React from "react";
import { Table } from "antd";

const JobOrderTable = ({ data, headerClass }) => {
  const columns = [
    {
      key: "jobOrder",
      dataIndex: "jobOrder",
      title: "Job Order",
      align: "center",
    },
    {
      key: "date_issued",
      dataIndex: "date_issued",
      title: "Date Issued",
      align: "center",
    },
    {
      key: "date_needed",
      dataIndex: "date_needed",
      title: "Date Needed",
      align: "center",
    },
    {
      key: "quantity",
      title: "Produced / Qty.",
      render: (record) => `${record.producedQty} / ${record.quantity}`,
      align: "center",
    },
  ];
  return (
    <>
      <Table
        size="small"
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
        bodyStyle={{
          overflowX: "auto",
        }}
      />
    </>
  );
};

export default JobOrderTable;
