import React, { useContext } from 'react';
import moment from 'moment';
import { JoContext } from '../../context/JobOrder/JobOrderContext';
import { Checkbox, Button, Spin } from 'antd';
import { Formik, Form, Field } from 'formik';
import { AntInput, AntDatePicker, AntInputNumber } from '../AntField';
import { validateJoForm } from '../../validation/validation';
// import { FormikDebug } from '@jbuschke/formik-antd';
import Confirm from '../Confirm';

const JobOrderForm = props => {
  const {
    data,
    closeModal,
    joSeries,
  } = props;

  const { joborder: { openItems }, addJo, editJo } = useContext(JoContext);
  const initialValue = {
    item_id: data.item_id,
    qtyWithoutJo: data.qtyWithoutJo,
    seriesNumber: joSeries,
    jo_num: joSeries,
    date_issued: '',
    date_needed: '',
    quantity: null,
    remarks: '',
    others: '',
    useSeries: true,
    forwardToWarehouse: false,
  }
  const checkMethod = data.id ? 'EDIT' : 'ADD';
  return (
    <Formik
      initialValues={data.id ? data : initialValue}
      validationSchema={validateJoForm}
      onSubmit={(values, { setSubmitting }) => {
        data.id
          ?
          Confirm(editJo, setSubmitting, values, closeModal)
          :
          Confirm(addJo, setSubmitting, values, openItems, closeModal);
      }}
      enableReinitialize
    >
      {({ values, isSubmitting, submitCount, setValues, setFieldValue, handleReset, handleSubmit }) => {
        return (
          <Spin spinning={isSubmitting} tip="Submitting">
            <Form>
              {checkMethod === 'ADD' &&
                <Checkbox
                  defaultChecked={values.useSeries}
                  checked={values.useSeries}
                  onChange={e => setValues({ ...values, jo_num: values.seriesNumber, useSeries: !values.useSeries })}
                >
                  USE SERIES
                </Checkbox>
              }
              <Field
                component={AntInput}
                name="jo_num"
                label="Job order"
                value={values.useSeries ? values.seriesNumber : values.jo_num}
                disabled={values.useSeries || checkMethod === 'EDIT'}
                submitCount={submitCount}
                hasFeedback
              />

              <Field
                component={AntDatePicker}
                name="date_issued"
                label="Date issued"
                submitCount={submitCount}
                value={values.date_issued ? moment(values.date_issued, 'YYYY-MM-DD') : null}
                disabledDate={(current) => current.isAfter(moment())}
                format="YYYY-MM-DD"
                allowClear={false}
                hasFeedback
              />

              <Field
                component={AntDatePicker}
                name="date_needed"
                label="Date needed"
                submitCount={submitCount}
                value={values.date_needed ? moment(values.date_needed, 'YYYY-MM-DD') : null}
                format="YYYY-MM-DD"
                disabledDate={(current) => current.isBefore(values.date_issued)}
                allowClear={false}
                hasFeedback
              />

              <Field
                component={AntInputNumber}
                name="quantity"
                label="Quantity"
                min={0}
                max={values.qtyWithoutJo}
                value={values.quantity}
                submitCount={submitCount}
                hasFeedback
              />

              <Field
                component={AntInput}
                name="remarks"
                label="Remarks"
                submitCount={submitCount}
                hasFeedback
              />

              <Field
                component={AntInput}
                name="others"
                label="Others"
                submitCount={submitCount}
                hasFeedback
              />

              <Checkbox
                style={{
                  margin: 8,
                }}
                className="red-cl"
                defaultChecked={values.forwardToWarehouse}
                checked={values.forwardToWarehouse}
                onChange={e => setFieldValue('forwardToWarehouse', e.target.checked)}
              >
                FORWARD TO WAREHOUSE
            </Checkbox>

              <div className="ant-modal-footer" style={{ margin: '0 -20px 0 -20px' }}>
                <Button onClick={handleReset}>Reset</Button>
                <Button icon="save" disabled={isSubmitting} type="primary" onClick={handleSubmit}>Submit</Button>
              </div>
            </Form>
            {/* <FormikDebug /> */}

          </Spin>
        )
      }}
    </Formik>
  )
}

export default JobOrderForm
