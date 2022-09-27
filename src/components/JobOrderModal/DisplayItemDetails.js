import React from 'react';
import { Descriptions } from 'antd';

const DisplayItemDetails = ({ data }) => (
	<Descriptions size="small" column={2} bordered>
		<Descriptions.Item label="Code" span={1}>
			{data.code}
		</Descriptions.Item>
		<Descriptions.Item label="Purchase order" span={1}>
			{data.po_num}
		</Descriptions.Item>
		<Descriptions.Item label="Customer" span={2}>
			{data.customer}
		</Descriptions.Item>
		<Descriptions.Item label="Item description" span={2}>
			{data.itemdesc}
		</Descriptions.Item>
    <Descriptions.Item label="Unit price" span={2}>
			{data.unitprice}
		</Descriptions.Item>
		<Descriptions.Item label="Part number" span={2}>
			{data.partnumber}
		</Descriptions.Item>
		<Descriptions.Item label="Delivery Ddate" span={2}>
			{data.deliverydate}
		</Descriptions.Item>
	</Descriptions>
);

export default DisplayItemDetails;
