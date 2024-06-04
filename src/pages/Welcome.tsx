import {PageContainer} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
import {Card, List, theme, Badge} from 'antd';
import React, {useEffect, useState} from 'react';
import {Button, Typography, Tag} from 'antd';
import * as notificationApi from '@/services/api/notification/Notification'
import {useAccess} from 'umi';
import {history} from 'umi';
import {
  FieldTimeOutlined,
  UserOutlined,

} from '@ant-design/icons';

const {Text,} = Typography;
const Welcome: React.FC = () => {
  const access = useAccess();

  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');
  const [notifications, setNotifications]: any = useState()

  const columns = [
    {
      title: '项目编号',
      dataIndex: 'projectCode',
      key: 'projectCode',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
  ];

  const dataSource = [
    {
      key: '1',
      projectCode: 'projectCode',
      content: 32,
    },
    {
      key: '2',
      projectCode: '胡彦祖',
      content: 33,
    },
  ];


  const getNotification = async () => {
    const res = await notificationApi.getOwn()
    const data = res.data.result
    setNotifications(data)

  }
  useEffect(() => {
    getNotification()
  }, [])


  const see = async (item: any) => {
    history.push(`/Project/${item.projectId}`)
    const data: any = {
      id: item.id,
      status: 'read'
    }
    await notificationApi.update({data: data});
  }
  const [show, setShow] = useState(false);


  const RenderAdminMessage = (item: any) => {
    if (item.type === 'declaration') {
      return (
        <>
          <div>
            <FieldTimeOutlined/>
            {/* <Tag color="blue">Ant Design</Tag> */}
            {/* color={'#65E8E0'} */}
            <Tag style={{marginLeft: 4}} color="blue">{item.createTime}</Tag>
          </div>
          <div style={{marginTop: 8}}>
            {/* color={'#2db7f5'} */}
            <UserOutlined/> <Tag style={{marginLeft: 4}}>  {item.fromName}</Tag>已申报项目
          </div>
        </>
      )
    } else if (item.type === 'assessment') {

    } else if (item.type === 'conclusion') {

    } else if (item.type === 'end') {

    } else if (item.type === 'approval') {

    }
  }
  return (
    <PageContainer
      header={{
        title: '消息列表',
      }}
    >

      <Card>
        {!access.flowEdit &&
          <List

            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item: any, index) => (
              <List.Item>
                <List.Item.Meta
                  // avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                  title={
                    <>
                      <Badge dot={item?.status === 'unread'} style={{marginLeft: 212}}>
                        <Text strong>{item.projectName}</Text>
                      </Badge>
                    </>
                  }
                  description={

                    <>
                      <div>
                        <FieldTimeOutlined/>
                        <Tag style={{marginLeft: 4}} color="blue">{item.createTime}</Tag>
                      </div>
                      <div style={{marginTop: 8}}><UserOutlined/><span
                        style={{marginLeft: 4}}>{`来自${item.fromName}的消息：${item.content}`}</span></div>
                    </>

                  }
                />
                <Button type='dashed' onClick={() => {
                  see(item)
                }}>查看</Button>

              </List.Item>
            )}
          />
        }
        {access.flowEdit &&
          <List
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            itemLayout="horizontal"
            dataSource={notifications}
            // grid={{ gutter: 16, column: 2 }}
            renderItem={(item: any, index) => (
              <List.Item>
                <List.Item.Meta
                  // avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                  title={<><Badge dot={item?.status === 'unread'} style={{marginLeft: 212}}>
                    <Text strong>{item.projectName}</Text>
                    {/* <Tag color="#5BD8A6">{item.projectName}</Tag><MessageOutlined  /> */}
                    {/* {`${item.projectName}`} */}
                  </Badge></>}
                  description={RenderAdminMessage(item)}
                />
                <Button type='dashed' onClick={() => {
                  see(item)
                }}>查看</Button>

              </List.Item>
            )}
          />
        }

      </Card>


    </PageContainer>
  );
};

export default Welcome;
