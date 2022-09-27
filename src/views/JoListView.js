import React, { Fragment, useContext, useEffect, useState, lazy } from 'react';
import { Button } from 'antd';
import { JoContext } from '../context/JobOrder/JobOrderContext';
import { Utils } from '../context/UtilsContext';
import Layout from '../layout/Layout';

const JobOrderModal = lazy(() =>
	import('../components/JobOrderModal/JobOrderModal')
);
const JobOrderTable = lazy(() =>
	import('../components/JobOrderModal/JobOrderTable')
);
const JobOrderProducedModal = lazy(() =>
	import('../components/JobOrderModal/JobOrderProducedModal')
);
const JobOrderCancel = lazy(() =>
	import('../components/JobOrderModal/JobOrderCancel')
);
const JobOrderFilter = lazy(() =>
	import('../components/Filter/JobOrderFilter')
);

const defaultFilter = {
	search: '',
	sort: 'jo-desc',
	showRecord: 'Open',
	customer: null,
	year: null,
	month: null,
};

const defaultVal = {
	selectedRowKeys: [],
};

const JoListView = (props) => {
	const {
		joborder: { joList, joListLength, customers },
		getJo,
		deleteJo,
		exportJoCsv,
		exportJoPdf,
	} = useContext(JoContext);
	const { setLoading } = useContext(Utils);

	const [filter, setFilter] = useState(defaultFilter);
	const [modalConfig, setModalConfig] = useState({ visible: false });
	const [selectedJo, setSelectedJo] = useState(defaultVal);
	const [paginate, setPaginate] = useState({ page: 1, pageSize: 10 });
	const [isSelectingItem, setSelectingItem] = useState(false);

	const openModal = (data, viewType) =>
		setModalConfig({ visible: true, viewType, data });
	const closeModal = () => setModalConfig({ visible: false });

	const resetPagination = () => setPaginate({ page: 1, pageSize: 10 });
	const onResetFilter = () => {
		getJo(setLoading, defaultFilter);
		setFilter(defaultFilter);
		resetPagination();
	};

	const onFilter = () => {
		getJo(setLoading, filter);
		resetPagination();
	};

	const shouldFetchFromServer = ({ page, pageSize }) => {
		const totalData = page * pageSize;
		const currentDataLength = joList.length; //
		const dataTotalLength = joListLength;
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
			getJo(setLoading, filter, newPage, shouldLoadAll);
		}
		setPaginate({ page, pageSize });
	};

	const onSizeChange = (page, pageSize) => {
		const { shouldReload, newPage, shouldLoadAll } = shouldFetchFromServer({
			page,
			pageSize,
		});
		if (shouldReload) {
			getJo(setLoading, filter, newPage, shouldLoadAll);
		}
		setPaginate({ page, pageSize });
	};

	useEffect(() => {
		getJo(setLoading, filter);
	}, []);

	return (
		<Fragment>
			<br />
			<h2>List of job orders</h2>
			<JobOrderFilter
				filter={filter}
				onResetFilter={onResetFilter}
				onFilter={onFilter}
				setFilter={setFilter}
				customers={customers}
			/>

			<Button
				onClick={() =>
					isSelectingItem && selectedJo.selectedRowKeys.length > 0
						? exportJoPdf(selectedJo.selectedRowKeys, setLoading)
						: setSelectingItem(true)
				}
				className="bl-cl"
				style={{ marginRight: 5 }}
				icon="printer"
				disabled={isSelectingItem && selectedJo.selectedRowKeys.length < 1}
			>
				Print Job Order
			</Button>

			{isSelectingItem && (
				<Button
					onClick={() => {
						setSelectingItem(false);
						setSelectedJo(defaultVal);
					}}
					className="red-cl"
					style={{ marginRight: 5 }}
					icon="close-circle"
				>
					Cancel
				</Button>
			)}

			<Button
				onClick={() => exportJoCsv(setLoading, filter)}
				className="bl-cl"
				style={{ marginRight: 5 }}
				icon="file-excel"
			>
				Export to CSV
			</Button>

			<Button
				onClick={() => {
					getJo(setLoading, filter);
					resetPagination();
				}}
				className="bl-cl"
				style={{ marginRight: 5 }}
				icon="sync"
			>
				Refresh Content
			</Button>

			<JobOrderTable
				joList={joList}
				joListLength={joListLength}
				onPageChange={onPageChange}
				onSizeChange={onSizeChange}
				openModal={openModal}
				paginate={paginate}
				deleteJo={deleteJo}
				setLoading={setLoading}
				setSelectedJo={setSelectedJo}
				isSelectingItem={isSelectingItem}
			/>

			{modalConfig.visible && modalConfig.viewType === 'EDITJO' && (
				<JobOrderModal
					data={modalConfig.data}
					visible={modalConfig.visible}
					closeModal={closeModal}
					userType={props.userType}
				/>
			)}

			{modalConfig.visible && modalConfig.viewType === 'VIEWPRODUCED' && (
				<JobOrderProducedModal
					data={modalConfig.data}
					visible={modalConfig.visible}
					closeModal={closeModal}
					userType={props.userType}
				/>
			)}

			{modalConfig.visible && modalConfig.viewType === 'CANCELJO' && (
				<JobOrderCancel
					data={modalConfig.data}
					visible={modalConfig.visible}
					closeModal={closeModal}
				/>
			)}
		</Fragment>
	);
};

export default Layout(JoListView);
