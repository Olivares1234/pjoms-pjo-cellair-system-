import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

const DeliveryChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="deliverydate" />
      <YAxis width={data.length > 0 ? 40 : 0.5} />
      <Tooltip />
      <Line
        type="monotone"
        name="Quantity"
        dataKey="quantity"
        stroke="#3c8dbc"
      />
    </LineChart>
  </ResponsiveContainer>
);
export default DeliveryChart;
