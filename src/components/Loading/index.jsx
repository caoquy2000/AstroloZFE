import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './index.less';

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />;

const Loading = () => <Spin indicator={antIcon} />

export default Loading;
