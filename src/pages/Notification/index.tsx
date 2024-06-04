import type { ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import * as notificationApi from '@/services/api/notification/Notification';
import Detail from './Detail'

type IPListProps = {
  notifications: any;
  onChange: (id: string) => void;
};

const NotificationList: React.FC<IPListProps> = (props) => {
  const { onChange, notifications } = props;

  const columns: ProColumns<NotificationType>[] = [
    {
      title: '项目名称',
      key: 'name',
      dataIndex: 'name',
      // render: (_, item) => {
      //   return <Badge status={item.status} text={item.ip} />;
      // },
    },
  ];

  interface NotificationType {
    name: string
    category: string
    title: string
    department: string
    startDate: Date
    endDate: Date
    firstApplyFunds: number

  }


  return (
    <>
      <ProTable
        columns={columns}
        dataSource={notifications}
        rowKey="id"
        options={false}
        pagination={false}
        search={false}
        onRow={(record : any) => {
          return {
            onClick: () => {
              if (record.id) {
                onChange(record.id);
              }
            },
          };
        }}
      />
    </>
  );
};

export default () => {
  const [notifications, setNotifications] : any = useState([])
  const [notification, setNotification] : any = useState()

  const get = async () => {
    const result = await notificationApi.get()
    setNotifications(result.data.notifications)
  }

  useEffect(() => {
    get()
  }, []);


  const onRowChange = (id : string) => {
    const list = notifications.filter((e : any) => {
      return e.id === id
    })
    setNotification(list[0])
  }

  return (
    <ProCard boxShadow split="vertical">
      <ProCard colSpan="384px" ghost>
        <NotificationList onChange={onRowChange} notifications={notifications} />
      </ProCard>
      <ProCard title={notification?.name}>
        <Detail message='1' from='2' />
      </ProCard>
      
    </ProCard>
  );
};
