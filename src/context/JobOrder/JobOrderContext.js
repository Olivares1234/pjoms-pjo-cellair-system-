import React, { createContext, useReducer } from 'react';
//api
import moment from 'moment';
import axios from 'axios';
import { API } from '../../config/config';
import { displayErrors, displayNotification } from '../../config/display';
import { headers } from '../../config/token';

import {
	reducer,
	GET_OPENITEMS,
	ADD_JO,
	GET_JO,
	EDIT_JO,
	DELETE_JO,
	GET_JOPRODUCEDQTY,
	ADD_JOPRODUCEDQTY,
	DELETE_JOPRODUCEDQTY,
	CLOSE_JOBORDER,
} from './JobOrderReducer';

export const JoContext = createContext({});

const JobOrderContext = ({ children }) => {
	const initialState = {
		openItems: [],
		joList: [],
		customers: [],
	};
	const [joborder, dispatch] = useReducer(reducer, initialState);

	// FUNCTIONS
	const getFilterParams = (filter) => {
		let params = '';
		Object.keys(filter).forEach((key) => {
			params += filter[key] ? `&${key}=${filter[key]}` : '';
		});
		return params;
	};

	const getOpenItems = (setLoading, filter, page = 1, shouldLoadAll = ``) => {
		const filterParams = getFilterParams(filter);
		setLoading(true);
		axios
			.get(
				API +
					`pjoms/option/openitems?page=${page}${filterParams}${shouldLoadAll}`,
				headers()
			)
			.then((res) => {
				const { openItems, openItemsLength, customers } = res.data;

				dispatch({
					type: GET_OPENITEMS,
					payload: {
						page,
						openItems,
						openItemsLength,
						customers,
					},
				});

				setLoading(false);
			})
			.catch((err) => {
				displayErrors(err);
				setLoading(false);
			});
	};

	const getJo = (setLoading, filter, page = 1, shouldLoadAll = ``) => {
		const filterParams = getFilterParams(filter);

		setLoading(true);
		axios
			.get(
				API + `pjoms/jo?page=${page}${filterParams}${shouldLoadAll}`,
				headers()
			)
			.then((res) => {
				const { joList, joListLength, customers } = res.data;
				dispatch({
					type: GET_JO,
					payload: {
						joList,
						joListLength,
						customers,
						page,
					},
				});
				setLoading(false);
			})
			.catch((err) => {
				displayErrors(err);
				setLoading(false);
			});
	};

	const addJo = (values, openItems, closeModal, setSubmitting) => {
		setSubmitting(true);

		axios
			.post(API + `pjoms/jo`, values, headers())
			.then((res) => {
				const { newItem, message } = res.data;

				const newOpenItems = [...openItems];
				const openItemIndex = newOpenItems.findIndex(
					(data) => data.item_id === values.item_id
				);
				if (newItem.qtyWithoutJo < 1) newOpenItems.splice(openItemIndex, 1);
				else newOpenItems[openItemIndex] = newItem;

				dispatch({
					type: ADD_JO,
					payload: {
						newOpenItems,
						remainingQty: newItem.qtyWithoutJo,
					},
				});

				displayNotification('success', message);

				closeModal();
			})
			.catch((err) => {
				setSubmitting(false);
				displayErrors(err);
			});
	};

	const editJo = (values, closeModal, setSubmitting) => {
		setSubmitting(true);

		axios
			.put(API + `pjoms/jo/${values.id}`, values, headers())
			.then((res) => {
				const { updatedJos, message } = res.data;

				dispatch({
					type: EDIT_JO,
					payload: {
						updatedJos,
					},
				});

				displayNotification('success', message);
				closeModal();
			})
			.catch((err) => {
				setSubmitting(false);
				displayErrors(err);
			});
	};

	const deleteJo = (id, remarks, setLoading, closeModal) => {
		if (remarks.trim() === '' || remarks === null) {
			displayNotification('error', 'Please input remarks');
			return null;
		}
		setLoading(true);

		axios
			.delete(API + `pjoms/jo/${id}?remarks=${remarks}`, headers())
			.then((res) => {
				const { message, updatedJos } = res.data;

				dispatch({
					type: DELETE_JO,
					payload: {
						id,
						updatedJos,
					},
				});

				setLoading(false);
				closeModal();
				displayNotification('success', message);
			})
			.catch((err) => {
				setLoading(false);
				closeModal();
				displayErrors(err);
			});
	};

	const getJoProducedQty = (id) => {
		axios
			.get(API + `pjoms/jo/produced/${id}`, headers())
			.then((res) => {
				const { joProduced } = res.data;

				dispatch({
					type: GET_JOPRODUCEDQTY,
					payload: {
						joProduced,
					},
				});
			})
			.catch((err) => {
				displayErrors(err);
			});
	};

	const addJoProducedQty = (
		values,
		setRemaining,
		setViewAddForm,
		resetForm,
		setSubmitting
	) => {
		setSubmitting(true);

		axios
			.post(API + `pjoms/jo/produced`, values, headers())
			.then((res) => {
				const { newProduced, updatedJo, message } = res.data;

				dispatch({
					type: ADD_JOPRODUCEDQTY,
					payload: {
						newProduced,
						updatedJo,
					},
				});
				setRemaining(values.newQty);
				setViewAddForm(false);
				resetForm();
				displayNotification('success', message);
				setSubmitting(false);
			})
			.catch((err) => {
				setSubmitting(false);
				displayErrors(err);
			});
	};

	const deleteJoProducedQty = (id, newQty, setRemaining, setLoading) => {
		setLoading(true);
		axios
			.delete(API + `pjoms/jo/produced/${id}`, headers())
			.then((res) => {
				const { updatedJo, message } = res.data;

				dispatch({
					type: DELETE_JOPRODUCEDQTY,
					payload: {
						message,
						id,
						updatedJo,
					},
				});
				setRemaining(newQty);
				displayNotification('success', message);
				setLoading(false);
			})
			.catch((err) => {
				displayErrors(err);
				setLoading(false);
			});
	};

	const closeJobOrder = (id, closeModal, setLoading) => {
		setLoading(true);
		axios
			.post(API + `pjoms/jo/produced/${id}`, { id }, headers())
			.then((res) => {
				const { updatedJo, message } = res.data;

				dispatch({
					type: CLOSE_JOBORDER,
					payload: {
						updatedJo,
					},
				});
				closeModal();
				setLoading(false);
				displayNotification('success', message);
			})
			.catch((err) => {
				setLoading(false);
				displayErrors(err);
			});
	};

	const exportJoCsv = (setLoading, filter) => {
		setLoading(true);
		const { showRecord, sort, search } = filter;
		let filter_params = `?showRecord=${showRecord}&sort=${sort}`;

		if (search !== undefined && search && search.trim() !== '') {
			filter_params += `&search=${search}`;
		}

		const dateNow = moment().format('Y_M_D');
		axios({
			url: API + `pjoms/jo/export-csv/dl${filter_params}`,
			method: 'get',
			responseType: 'blob',
			...headers(),
		})
			.then((res) => {
				displayNotification('success', 'File successfully generated');
				const url = window.URL.createObjectURL(new Blob([res.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('target', '_blank');
				link.setAttribute('download', `Joborder_report_as_of_${dateNow}.xlsx`);
				document.body.appendChild(link);
				link.click();
				link.parentElement.removeChild(link);
				setLoading(false);
			})
			.catch((err) => {
				displayErrors(err);
				setLoading(false);
			});
	};

	const exportJoPdf = (keys, setLoading) => {
		const joids = keys.join('-');
		setLoading(true);
		axios({
			url: API + `pjoms/jo/export/print?jos=${joids}`,
			method: 'get',
			responseType: 'blob',
			...headers(),
		})
			.then((res) => {
				displayNotification('success', 'File successfully generated');
				//Create a Blob from the PDF Stream
				const file = new Blob([res.data], { type: 'application/pdf' });
				//Build a URL from the file
				const fileURL = URL.createObjectURL(file);
				//Open the URL on new Window
				window.open(fileURL);
				setLoading(false);
			})
			.catch((err) => {
				displayErrors(err);
				setLoading(false);
			});
	};

	const getItemDetails = (id) => {
		return axios
			.get(API + `pjoms/jo/itemdetails/${id}`, headers())
			.then((res) => res.data)
			.catch((err) => {
				displayErrors(err);
				throw new Error('something wrong with server!');
			});
	};

	return (
		<JoContext.Provider
			value={{
				joborder,
				getOpenItems,
				addJo,
				editJo,
				getJo,
				deleteJo,
				getJoProducedQty,
				addJoProducedQty,
				deleteJoProducedQty,
				closeJobOrder,
				exportJoCsv,
				exportJoPdf,
				getItemDetails,
			}}
		>
			{children}
		</JoContext.Provider>
	);
};

export default JobOrderContext;
