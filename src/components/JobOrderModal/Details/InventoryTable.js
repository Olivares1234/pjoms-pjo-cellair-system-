import React, { useState } from "react";
import { Table, Input } from "antd";

const InventoryTable = ({ data }) => {
  const [search, setSearch] = useState("");
  const columns = [
    {
      key: "code",
      dataIndex: "code",
      title: "Code",
      align: "center",
    },
    {
      key: "mspecs",
      dataIndex: "mspecs",
      title: "Material Specs",
      align: "center",
    },
    {
      key: "quantity",
      dataIndex: "quantity",
      title: "Qty.",
      align: "center",
    },
  ];

  const filteredInventory = data.filter((val) => {
    return (
      val.code
        .toString()
        .toUpperCase()
        .indexOf(search.toString().toUpperCase()) !== -1 ||
      val.mspecs
        .toString()
        .toUpperCase()
        .indexOf(search.toString().toUpperCase()) !== -1
    );
  });
  console.log(filteredInventory);

  return (
    <>
      <Input.Search
        placeholder="Search here..."
        size="default"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", maxWidth: 420, marginBottom: 4 }}
      />
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={filteredInventory}
        pagination={{
          pageSize: 5,
        }}
        bodyStyle={{
          overflowX: "auto",
        }}
      />
    </>
  );
};

export default InventoryTable;
