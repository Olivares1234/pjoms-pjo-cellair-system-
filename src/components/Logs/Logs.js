import React, { Fragment } from "react";
import { Table } from "antd";

const Logs = (props) => {
  const { logs, loading, paginate, size, onPageChange, onSizeChange } = props;
  const columns = [
    {
      key: "user",
      dataIndex: "user",
      title: "User",
      align: "center",
      width: "8%",
    },
    {
      key: "action",
      title: "Action",
      width: "25%",
      render: (data) => {
        return {
          props: {
            style: { whiteSpace: "normal" },
          },
          children: data.action,
        };
      },
    },
    {
      key: "before",
      title: "Before",
      render: (data) => {
        return {
          children: data.before
            .split("\n")
            .map((data, key) => <div key={key}>{data}</div>),
        };
      },
    },
    {
      key: "after",
      title: "After",
      render: (data) => {
        return {
          children: data.after
            .split("\n")
            .map((data, key) => <div key={key}>{data}</div>),
        };
      },
    },
    {
      key: "date",
      title: "Date",
      width: "15%",
      render: (data) => {
        return {
          props: {
            style: { whiteSpace: "normal" },
          },
          children: data.date,
        };
      },
    },
  ];
  return (
    <Fragment>
      <Table
        loading={loading}
        bordered={true}
        dataSource={logs}
        columns={columns}
        rowKey="id"
        bodyStyle={{ overflowX: "auto" }}
        pagination={{
          total: size,
          current: paginate.page,
          pageSize: paginate.pageSize,
          defaultPageSize: paginate.pageSize,
          showSizeChanger: true,
          onChange: onPageChange,
          onShowSizeChange: onSizeChange,
          pageSizeOptions: ["10", "25", "50", "100", "500"],
        }}
      />
    </Fragment>
  );
};

export default Logs;
