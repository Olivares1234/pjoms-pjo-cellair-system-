import React, { useState, useContext } from 'react'

import Loader from '../Loader/Loader';
import { AntInput, AntPassword } from '../AntField';
import { API } from '../../config/config';
import { setToken } from '../../config/token';
import { Utils } from '../../context/UtilsContext';

import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { Button, notification } from 'antd';

const createCookie = (name) => {
  var date = new Date();
  date.setTime(date.getTime() + (2 * 60 * 1000));
  var expires = "expires=" + date.toGMTString();
  document.cookie = `${name}=1; ${expires}; path=/;`;
}

const checkCookie = (name) => {
  const cookie = document.cookie;
  const doesExist = cookie.split('; ').some(val => val.indexOf(name) !== -1);
  return doesExist;
}

const SubmitHandler = (
  values,
  setSubmitting,
  setValues,
  submitCount,
  addSubmitCount,
  setLoading,
  setLoginSuccess,
) => {
  if ((submitCount[values.username] && submitCount[values.username] > 2) || checkCookie(values.username)) {
    notification.error({
      message: 'You have been blocked for a few minutes!'
    });
    setSubmitting(false);

    if (submitCount[values.username] === 3) {
      delete submitCount[values.username];
      createCookie(values.username);
    }
  } else {
    setLoading(true);
    axios.post(`${API}login/pjoms`, values)
      .then(res => {
        setToken(res.data.access_token);
        setLoading(false);
        setLoginSuccess(true);
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          notification.error({
            message: 'Invalid username or password'
          });
          setValues({ username: values.username, password: '' });
          addSubmitCount(val => {
            const user = val[values.username];
            return {
              ...val,
              [values.username]: user ? user + 1 : 1,
            }
          })

        } else {
          notification.error({
            message: 'NO RESPONSE FROM THE SERVER!!'
          });
        }
        setSubmitting(false);
        setLoading(false);
      })
  }
}

const validate = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(2, 'Username should be atleast 2 characters')
    .max(12, 'Username should not exceed 12 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Password should be atleast 3 characters')
    .max(12, 'Password should not exceed 12 characters'),
})

function LoginForm({ setLoginSuccess }) {
  const defaultValues = {
    username: '',
    password: '',
  }
  const { loading, setLoading } = useContext(Utils);
  const [submitCount, addSubmitCount] = useState({});
  return (
    <Formik
      validationSchema={validate}
      onSubmit={(values, { setSubmitting, setValues }) => (
        SubmitHandler(values, setSubmitting, setValues, submitCount, addSubmitCount, setLoading, setLoginSuccess)
      )}
      initialValues={defaultValues}>
      {({ values, isSubmitting }) => {

        return (
          <Form className="form-login">
            {
              loading ?
                <Loader />
                : null
            }
            <span className="form-title">ACCOUNT LOGIN</span>
            <Field
              component={AntInput}
              name="username"
              value={values.username}
              autoComplete="off"
              size="large"
              placeholder="Username"
              hasFeedback
              autoFocus={true}
            />

            <Field
              component={AntPassword}
              name="password"
              value={values.password}
              autoComplete="off"
              size="large"
              placeholder="Password"
              hasFeedback
            />
            <Button size="large" htmlType="submit" disabled={isSubmitting} block>SIGN IN</Button>
          </Form>
        )

      }}
    </Formik>
  )
}

export default LoginForm
