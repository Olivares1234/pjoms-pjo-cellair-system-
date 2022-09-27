import map from "lodash/map";
import React from "react";
import { getIn } from 'formik';
import {
  DatePicker,
  Input,
  TimePicker,
  Select,
  AutoComplete,
  InputNumber,
  Checkbox,
  Form,
  Cascader
} from "antd";
import MaskedInput from 'antd-mask-input';

const { Option } = Select;

const makeUpperCase = (str) => {
  str = str.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, letter => {
    return letter.toUpperCase();
  });
  return str;
}

const CreateAntField = (Component, _fieldType) => ({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  keyName,
  displayName,
  submitCount,
  type,
  checkLabel,
  labelCol,
  wrapperCol,
  maskedValue,
  capitalize,
  ...props
}) => {

  const touched = getIn(form.touched,field.name);
  const submitted = submitCount > 0;
  const hasError = getIn(form.errors,field.name);
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }) => form.setFieldValue(field.name, value);
  const onChange = (v1, v2) => {
    if (_fieldType === 'datepicker')
      form.setFieldValue(field.name, v2)
    else if (_fieldType === 'input')
      form.setFieldValue(field.name, capitalize ? makeUpperCase(v1.target.value) : v1.target.value);
    else if (_fieldType === 'check')
      form.setFieldValue(field.name, v1.target.checked)
    else
      form.setFieldValue(field.name, capitalize ? makeUpperCase(v1) : v1);

  }


  const onBlur = () => form.setFieldTouched(field.name, true);

  if (_fieldType === 'autocomplete') {
    props.filterOption = (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
  }

  let Opt = null;

  if (selectOptions || checkLabel) {

    if (selectOptions) {
      Opt = map(selectOptions, name => <Option key={keyName ? name[keyName] : name}>{displayName ? name[displayName] : name}</Option>);
    } else {
      Opt = checkLabel;
    }
  }



  return (
    <div className="field-container">
      <Form.Item
        style={{ marginBottom: 10, padding: 0 }}
        label={label}
        className={!labelCol && !wrapperCol ? 'label-top' : ''}
        hasFeedback={
          (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        }
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? "error" : "success"}
        labelCol={labelCol ? { ...labelCol } : null}
        wrapperCol={wrapperCol ? { ...wrapperCol } : null}
      >
        <Component
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
          style={{ width: '100%' }}
          autoComplete="off"
        >
          {Opt}
        </Component>
      </Form.Item>
    </div>
  );
};

export const AntSelect = CreateAntField(Select, 'select');
export const AntDatePicker = CreateAntField(DatePicker, 'datepicker');
export const AntInput = CreateAntField(Input, 'input');
export const AntPassword = CreateAntField(Input.Password, 'input');
export const AntTimePicker = CreateAntField(TimePicker, 'timepicker');
export const AntAutoComplete = CreateAntField(AutoComplete, 'autocomplete');
export const AntInputNumber = CreateAntField(InputNumber, 'inputnumber');
export const AntCheckbox = CreateAntField(Checkbox, 'check');
export const AntMaskedInput = CreateAntField(MaskedInput, 'input')
export const AntCascader = CreateAntField(Cascader, 'cascader')
