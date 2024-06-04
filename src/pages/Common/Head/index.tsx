import { history } from '@umijs/max';
import React, { useState } from 'react';
import { AppstoreOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Card, Tag, Row, Col } from 'antd';
import './index.less';

const items: MenuProps['items'] = [
  {
    label: '主页',
    key: '/user/home',
    icon: <HomeOutlined />,
  },
  {
    label: '内容广场',
    key: '/user/articleCentre',
    icon: <AppstoreOutlined />
  }
];

interface IProps {
  currentPage: string
}

const Head: React.FC<IProps> = (props) => {
  const {currentPage} = props;
  const [current, setCurrent] = useState(currentPage);

  const onClick: MenuProps['onClick'] = (e) => {
    const {key} = e;
    setCurrent(key);
    history.push(key);
  };

  return (
    <Card className='head-box' bodyStyle={{ padding: '5px 15px 5px 15px' }}>
      <Row justify="space-around" align="middle">
        <Col xs={2} sm={2} md={2} lg={2} xl={2}>
          <Tag color="#108ee9">
            曾烁淇的个人博客
          </Tag>
        </Col>
        <Col xs={18} sm={18} md={18} lg={18} xl={18}>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'right' }}>
          <Tag bordered={false} color="processing">
            湘ICP备2023002302号-1
          </Tag>
        </Col>
      </Row>
    </Card>
  );
};

export default Head;