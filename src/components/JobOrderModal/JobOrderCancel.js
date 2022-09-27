import React, { Fragment, useState } from 'react';
import { Modal, Alert, Input } from 'antd';

const JobOrderCancel = (
  {
    closeModal,
    data,
    visible,
  }) => {
  const { setLoading, id, deleteJo } = data;
  const [remarks, setRemarks] = useState("");
  return (
    <Modal
      okText="Confirm"
      visible={visible}
      onOk={() => deleteJo(id, remarks, setLoading, closeModal)}
      onCancel={closeModal}
    >
      {visible ?
        <Fragment>
          <br />
          <Alert message={<div>
            You are about to cancel {data.jo_num}
            <br />
          </div>} type="warning" showIcon />
          <Input.TextArea
            onChange={e => setRemarks(e.target.value)}
            style={{ marginTop: 5 }}
            row={3}
            value={remarks}
            placeholder="Input remarks here..." />
        </Fragment>
        : null}
    </Modal>
  )
}

export default JobOrderCancel
