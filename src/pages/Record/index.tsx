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

  // 分页
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [dataTotal, setDataTotal] = useState<number>()

  const getAllRecord = async (currentPage: number, pageSize: number) => {
    const result = await recordApi.getRecordByUserId({ currentPage, pageSize }, userId)

    if (result.code === 200) {
      const data = result.data.result
      const total = result.data.total

      setDataTotal(total)
      setTableList(data)
    }
  }


  const get = async () => {
    await getAllRecord(currentPage, pageSize)
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
            pagination={
              {
                total: dataTotal,
                pageSize: pageSize,
                current: currentPage,
                showQuickJumper: true,
                showSizeChanger: true,
                hideOnSinglePage: false,

                onChange: (page, size) => {

                  setCurrentPage(page)
                  setPageSize(size)
                  getAllRecord(page, size)

                },

              }
            }

          />

        </ProCard>
      </ProCard>
    </>
  );
};
