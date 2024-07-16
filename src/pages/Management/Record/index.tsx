import { ProCard, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import * as recordApi from '@/services/api/record';
import { Link } from '@umijs/max';

import {
  Button,
  Input,
} from 'antd';


export default () => {

  // const { initialState } = useModel('@@initialState');
  // const userId = initialState?.currentUser?.userId
  // const param: { [key: string]: any; } | undefined = []
  // param.push(userId)
  const [record, setRecord]: any = useState([])


  // search
  const [searchUserameInput, setSearchUserameInput] = useState('')
  const [tableList, setTableList] = useState<any>([])

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [dataTotal, setDataTotal] = useState<number>()

  const getAllRecord = async (currentPage:number,pageSize:number) => {
    const result = await recordApi.listRecord({ currentPage, pageSize})
    if (result.code === 200) {
      const data = result.data.result
      const total =result.data.total

      setDataTotal(total)
      setRecord(data)
      setTableList(data)
    }
    setSearchUserameInput('')
  }


  const get = async () => {
    await getAllRecord(currentPage,pageSize)
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
      render: (text: any, data: any) => {
        return (
          <>
            <Button type='dashed' color='blue'>
              <Link to={`/management/record/${data.userId}`} >{text}</Link>
            </Button>
          </>
        )
      }
    },
    {
      title: '实验记录数量',
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

  const filter = (
    username: any,
  ) => {
    const newList = record.filter((item: any) => {
      let usernameIndex

      if (item.username === undefined) {
        usernameIndex = 0
      } else if (username === '' || username === undefined || username === null) {
        usernameIndex = 1
      } else {
        usernameIndex = item.username.indexOf(username)
      }

      return usernameIndex >= 0
    })
    setTableList(newList)
  }

  const searchConferenceNameChange = (e: any) => {
    const value = e.target.value
    setSearchUserameInput(value)
    filter(value)
  }

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
                <Input addonBefore='记录提交人' value={searchUserameInput}
                  onChange={searchConferenceNameChange}>
                </Input>
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


        </ProCard >
      </ProCard>
    </>
  );
};
