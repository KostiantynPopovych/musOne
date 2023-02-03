import {
  LinkedinOutlined,
  TwitterOutlined
} from '@ant-design/icons';
import { PageHeader } from 'antd';
import React, {memo, useCallback} from 'react';

import { ICON_STYLES, TEXTS } from './config';

const Footer = () => {
  const handleIconClick = useCallback((href: string) => () => {
    window.open(href);
  }, []);

  return (
    <PageHeader
      title={TEXTS.LABEL}
      extra={[
        <TwitterOutlined style={ICON_STYLES} key={1} onClick={handleIconClick("https://twitter.com/Stan_Popovych")} />,
        <LinkedinOutlined style={ICON_STYLES} key={3} onClick={handleIconClick("https://www.linkedin.com/in/kostiantyn-popovych")} />
      ]}
    />
  )
};

export default memo(Footer);
