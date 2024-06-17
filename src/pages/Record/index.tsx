import { ProCard, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import * as recordApi from '@/services/api/record';
import { useModel, Link } from '@umijs/max';

import {
  Button,
  Tag,
} from 'antd';


export default () => {

  const { initialState } = useModel('@@initialState');
  const userId = initialState?.currentUser?.userId
  // const param: { [key: string]: any; } | undefined = []
  // param.push(userId)

  const [tableList, setTableList] = useState<any>([])


  const getAllRecord = async () => {
    const result = await recordApi.getRecordByUserId(userId)

    if (result.code === 200) {
      const data = result.data.result

      setTableList(data)
    }
  }


  const get = async () => {
    await getAllRecord()
  }
  useEffect(() => {
    get()
  }, [])

  const columns: any = [
    {
      title: '提交人',
      key: 'username',
      dataIndex: 'username',
      search: false,
      align: 'center',
      render: (text: any, record: any) => {
        return (
          <>
            <Button type='dashed' color='blue'>
              <Link to={`/myRecord/${record.userId}`}>{text}</Link>
            </Button>
          </>
        )
      }
    },
    {
      title: '样本记录数量',
      key: 'count',
      dataIndex: 'count',
      search: false,
      align: "center"
    },

    {
      title: '提交时间',
      key: 'submitTime',
      dataIndex: 'submitTime',
      search: false,
      align: "center"
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      search: false,
      align: "center"
    },

    {
      title: '更新时间',
      key: 'updateTime',
      dataIndex: 'updateTime',
      search: false,
      align: "center"
    },

  ];

  return (
    <>
      <ProCard boxShadow split="vertical">

        <ProCard ghost>

          <ProTable
            columns={columns}
            dataSource={tableList}
            rowKey="id"
            headerTitle={
              <>
              </>
            }
            toolbar={{
              actions: [
                <>

                </>
              ],
            }}

            search={false}
            pagination={{
              pageSize: 10,
              onChange: (page: any) => console.log(page),
            }}

          />

        </ProCard>
      </ProCard>
    </>
  );
};
