import { Input as AntdInput, Typography } from 'antd';
import React, { memo } from 'react';
import { WrappedFieldProps } from 'redux-form';

import sm from './styles.module.scss';

interface Props {
  label: string;
  placeholder: string;
}

const InputField = ({
  input,
  meta,
  label,
  placeholder
}: WrappedFieldProps & Props) => (
  <>
    <Typography.Title className={sm.Label} level={4}>
      {label}
    </Typography.Title>
    <AntdInput
      {...input}
      placeholder={placeholder}
      className={meta.error ? sm.Error : undefined}
    />
  </>
);

export default memo(InputField);
