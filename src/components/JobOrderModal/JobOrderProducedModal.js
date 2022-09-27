import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { JoContext } from '../../context/JobOrder/JobOrderContext';
import { Utils } from '../../context/UtilsContext';
import Confirm from '../Confirm';

import JobOrderProducedTable from './JobOrderProducedTable';
import JobOrderProducedForm from './JobOrderProducedForm';

const JobOrderProducedModal = props => {
  const {
    visible,
    closeModal,
    data,
    userType
  } = props;

  const { id, jo_num, remainingQty } = data;
  const [remaining, setRemaining] = useState(remainingQty);
  const [viewAddForm, setViewAddForm] = useState(false);
  const {
    joborder,
    getJoProducedQty,
    addJoProducedQty,
    deleteJoProducedQty,
    closeJobOrder } = useContext(JoContext);
  const { setLoading } = useContext(Utils);
  useEffect(() => {
    getJoProducedQty(id);
  }, []);

  return (
    <Modal
      visible={visible}
      onCancel={closeModal}
      style={{ top: 20, transition: 'width 200ms' }}
      title={`PRODUCED QTY. LIST FOR JOB ORDER ${jo_num}`}
      footer={null}
      width={viewAddForm ? "70%" : "50%"}
    >
      <Row gutter={16}>
        <Col lg={{ span: 8 }} style={{ display: viewAddForm ? 'inline' : 'none' }}>
          <JobOrderProducedForm
            remainingQty={remaining}
            setRemaining={setRemaining}
            id={id}
            jo_num={jo_num}
            addJoProducedQty={addJoProducedQty}
            setViewAddForm={setViewAddForm}
          />
        </Col>
        <Col lg={{ span: viewAddForm ? 16 : 24 }}>
          {remaining > 0 &&
            <div style={{ margin: '10px 0 10px 0' }}>
              {viewAddForm ?
                <Button
                  icon="close"
                  className="red-cl"
                  onClick={() => setViewAddForm(false)}
                  style={{ marginRight: 5 }}
                >Close form</Button>
                :
                <Fragment>

                  <Button
                    icon="form"
                    onClick={() => setViewAddForm(true)}
                    style={{ marginRight: 5 }}
                  >Add produced quantity</Button>

                  <Button
                    icon="close-circle"
                    style={{ marginRight: 5 }}
                    className="red-cl"
                    onClick={() => Confirm(closeJobOrder, null, id, closeModal, setLoading)}
                  >Close job order</Button>
                </Fragment>
              }
            </div>}
          <JobOrderProducedTable
            joProduced={joborder.joProduced}
            deleteJoProducedQty={deleteJoProducedQty}
            userType={userType}
            setLoading={setLoading}
            remainingQty={remaining}
            setRemaining={setRemaining}
          />
        </Col>
      </Row>

    </Modal>

  )
}

export default JobOrderProducedModal
