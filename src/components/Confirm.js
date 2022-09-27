import { Modal } from 'antd';
const confirm = Modal.confirm;

const Confirm = (okAction,cancelAction,...props) => {

  confirm({
    title : 'Confirmation',
    content : 'Do you really wish to continue?',
    onOk : () => okAction ?  okAction(...props,cancelAction) : null,
    okText : 'Confirm',
    onCancel : () => cancelAction ? cancelAction(false) : null,
    confirmLoading : true
  })
}

export default Confirm;