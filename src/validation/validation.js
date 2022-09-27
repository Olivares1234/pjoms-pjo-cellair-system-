import * as Yup from 'yup';
import moment from 'moment';

const rqdmsg = 'Required!';

export const validateJoForm = Yup.object().shape({
  jo_num: Yup.string()
    .max(60)
    .required(rqdmsg)
    .label('Job order'),
  date_issued: Yup.date()
    .max(moment().format('Y-M-D'))
    .label('Date issued')
    .required(rqdmsg),
  date_needed: Yup.date()
    .when('date_issued', (date_issued, schema) => date_issued ? schema.min(date_issued) : schema)
    .label('Date needed')
    .required(rqdmsg),
  quantity: Yup.number()
    .transform(cv => isNaN(cv) ? undefined : cv)
    .when('qtyWithoutJo', (qtyWithoutJo, schema) => schema.max(qtyWithoutJo))
    .min(1)
    .label('Quantity')
    .required(rqdmsg),
});

export const validateProducedJoQty = Yup.object().shape({
  quantity: Yup.number()
    .transform(cv => isNaN(cv) ? undefined : cv)
    .when('remainingQty', (remainingQty, schema) => schema.max(remainingQty))
    .min(1)
    .label('Quantity')
    .required(rqdmsg),
  date: Yup.date()
    .max(moment().format('Y-M-D'))
    .label('Date')
    .required(rqdmsg),
  remarks: Yup.string()
    .max(150)
});