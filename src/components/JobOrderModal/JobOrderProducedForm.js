import React from 'react';
import moment from 'moment';
import { Formik, Form, Field } from 'formik';
import { Button, Row, Col, Spin } from 'antd';
import { AntInput, AntDatePicker, AntInputNumber } from '../AntField';
import Confirm from '../Confirm';

import { validateProducedJoQty } from '../../validation/validation';

const JobOrderProducedForm = props => {

  const {
    remainingQty,
    id,
    jo_num,
    addJoProducedQty,
    setRemaining,
    setViewAddForm } = props;

  const initialValues = {
    remainingQty,
    id,
    jo_num,
    quantity: null,
    date: '',
    remarks: '',
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateProducedJoQty}
      onSubmit={(value, { setSubmitting, resetForm }) => {
        value.newQty = remainingQty - value.quantity;
        Confirm(addJoProducedQty, setSubmitting, value, setRemaining, setViewAddForm, resetForm);
      }}
      enableReinitialize
    >
      {({ values, isSubmitting, handleReset, handleSubmit, submitCount }) => {
        return (
          <Form>
            <Spin spinning={isSubmitting} tip="Submitting record">
              <Field
                component={AntInputNumber}
                name="quantity"
                label="Quantity"
                min={1}
                max={remainingQty}
                submitCount={submitCount}
                hasFeedback
              />

              <Field
                component={AntDatePicker}
                name="date"
                label="Date"
                value={values.date ? moment(values.date, 'YYYY-MM-DD') : null}
                submitCount={submitCount}
                format="YYYY-MM-DD"
                disabledDate={(current) => current.isAfter(moment())}
                hasFeedback
              />

              <Field
                component={AntInput}
                name="remarks"
                label="Remarks"
                max={150}
                submitCount={submitCount}
                hasFeedback
              />

              <Row gutter={8}>
                <Col lg={{ span: 12 }} >
                  <Button onClick={handleReset} block>Reset</Button>
                </Col>
                <Col lg={{ span: 12 }} >
                  <Button
                    onClick={handleSubmit}
                    icon="save"
                    disabled={isSubmitting}
                    type="primary" block>Submit</Button>
                </Col>
              </Row>
            </Spin>
          </Form>
        )
      }}
    </Formik>
  )
}

export default JobOrderProducedForm
