import React, { Fragment, useContext, useEffect, useState, lazy } from 'react';
import { Button } from 'antd';

import { JoContext } from '../context/JobOrder/JobOrderContext';
import { Utils } from '../context/UtilsContext';
import Layout from '../layout/Layout';

import JobOrderModal from '../components/JobOrderModal/JobOrderModal';

const PoItemsTable = lazy(() =>
	import('../components/PoItemsTable/PoItemsTable')
);
const PoItemsFilter = lazy(() => import('../components/Filter/PoItemsFilter'));

const defaultFilter = {
	search: '',
	customer: null,
	sort: 'latest',
	showItems: 'pending',
};

const PoItemsView = (props) => {
	const { setLoading } = useContext(Utils);
	const { joborder, getOpenItems } = useContext(JoContext);
	const { openItems, openItemsLength, joSeries, customers } = joborder;

	const [filter, setFilter] = useState(defaultFilter);
	const [modalConfig, setModalConfig] = useState({ visible: false });
	const [paginate, setPaginate] = useState({ page: 1, pageSize: 10 });

	const openModal = (data) => setModalConfig({ visible: true, data });
	const closeModal = () => setModalConfig({ visible: false });

	const resetPagination = () => setPaginate({ page: 1, pageSize: 10 });
	const onResetFilter = () => {
		getOpenItems(setLoading, defaultFilter);
		setFilter(defaultFilter);
		resetPagination();
	};

	const onFilter = () => {
		getOpenItems(setLoading, filter);
		resetPagination();
	};

	const shouldFetchFromServer = ({ page, pageSize }) => {
		const totalData = page * pageSize;
		const currentDataLength = openItems.length; //
		const dataTotalLength = openItemsLength;
		let shouldReload = false;
		if (
			totalData > currentDataLength &&
			(dataTotalLength > totalData ||
				(dataTotalLength > totalData - pageSize &&
					dataTotalLength > currentDataLength))
		) {
			shouldReload = true;
		}

		const shouldLoadAll =
			(totalData > dataTotalLength && dataTotalLength > totalData - pageSize) ||
			totalData === dataTotalLength
				? `&start=${currentDataLength}&end=${dataTotalLength}`
				: ``;

		return {
			shouldReload,
			newPage: Math.floor(currentDataLength / 1000) + 1,
			shouldLoadAll,
		};
	};

	const onPageChange = (page, pageSize) => {
		const { shouldReload, newPage, shouldLoadAll } = shouldFetchFromServer({
			page,
			pageSize,
		});
		if (shouldReload) {
			getOpenItems(setLoading, filter, newPage, shouldLoadAll);
		}
		setPaginate({ page, pageSize });
	};

	const onSizeChange = (page, pageSize) => {
		const { shouldReload, newPage, shouldLoadAll } = shouldFetchFromServer({
			page,
			pageSize,
		});
		if (shouldReload) {
			getOpenItems(setLoading, filter, newPage, shouldLoadAll);
		}
		setPaginate({ page, pageSize });
	};

	useEffect(() => {
		getOpenItems(setLoading, filter);
	}, []);

	const onRefreshContent = () => {
		getOpenItems(setLoading, filter);
		resetPagination();
	};

	return (
		<Fragment>
			<br />
			<h2>List of purchase order items</h2>

			<PoItemsFilter
				filter={filter}
				setFilter={setFilter}
				onFilter={onFilter}
				onResetFilter={onResetFilter}
				customers={customers}
			/>

			<Button
				onClick={onRefreshContent}
				className="bl-cl"
				style={{ marginRight: 5 }}
				icon="sync"
			>
				Refresh Content
			</Button>

			<PoItemsTable
				openItems={openItems}
				onPageChange={onPageChange}
				onSizeChange={onSizeChange}
				openItemsLength={openItemsLength}
				openModal={openModal}
				paginate={paginate}
				setPaginate={setPaginate}
			/>

			{modalConfig.visible && (
				<JobOrderModal
					data={modalConfig.data}
					userType={props.userType}
					visible={modalConfig.visible}
					closeModal={closeModal}
					joSeries={joSeries}
				/>
			)}
		</Fragment>
	);
};

export default Layout(PoItemsView);
