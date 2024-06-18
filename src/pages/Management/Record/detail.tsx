import { ProCard, ProForm, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import * as recordApi from '@/services/api/record';
import { useModel, Link, useParams } from '@umijs/max';

import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Tag,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


export default () => {

  const { initialState } = useModel('@@initialState');
  // const userId = initialState?.currentUser?.userId
  // const username = initialState?.currentUser?.userName
  // const param: { [key: string]: any; } | undefined = []
  // param.push(userId)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('')
  const [modalTitle, setModalTitle] = useState('')

  const [form] = ProForm.useForm()
  const [tableList, setTableList] = useState<any>([])

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [dataTotal, setDataTotal] = useState<number>()

  // const userIdParam = useParams()
  const { userId } = useParams()

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };


  const showModal = () => {
    setIsModalOpen(true);
    setModalTitle('新增实验记录')
    setModalStatus('add')

  };


  const showEditModal = (record: any) => {
    setIsModalOpen(true)
    setModalTitle('修改实验记录')
    setModalStatus('update')
    form.setFieldsValue({ id: record.id })
    form.setFieldsValue({ recordName: record.recordName })
  }

  const onIdChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ id: value })
  }

  const onRecordNameChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ recordName: value })
  }

  const getAllRecord = async (currentPage:number,pageSize:number) => {

    const result = await recordApi.listRecordByUserId({currentPage,pageSize},userId)

    if (result.code === 200) {
      const data = result.data.result
      const total =result.data.total

      let { userId } = data[0]
      localStorage.setItem('userId',userId)

      setDataTotal(total)
      setTableList(data)
    }
  }


  const get = async () => {
    await getAllRecord(currentPage,pageSize)
  }
  useEffect(() => {
    get()
  }, [])


  const del = async (record: any) => {
    const res = await recordApi.del(record?.id)
    if (res.code === 200) {
      message.success('删除成功')
    }else{
      message.warning(res.msg)
    }
    await getAllRecord(currentPage,pageSize)

  }


  const columns: any = [
    {
      title: '实验记录名称',
      key: 'recordName',
      dataIndex: 'recordName',
      search: false,
      align: "center",
      render: (text: any, record: any) => {
        return (
          <>
            <Button type='dashed' color='blue'>
              <Link to={`/management/record/sample/${record.id}`}>{text}</Link>
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
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      search: false,
      align: "center",
      render: (text: any) => {
        return (
          <>
            {text === '已完成' ? (
              <Tag color='success'>{text}</Tag>
            ) : (
              <Tag color='processing'>{text}</Tag>
            )}
          </>
        )
      }

    },
    {
      title: '提交时间',
      key: 'submitTime',
      dataIndex: 'submitTime',
      search: false,
      align: "center",
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.s - b.age,
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

    {
      title: '操作',
      key: 'operation',
      align: 'center',
      fixed: 'right',
      search: false,
      render: (text: any, reference: any) => {
        return (
          <>
            <Divider type="vertical" />
            <Button type="primary" onClick={() => {
              showEditModal(reference)
            }}>
              编辑
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title='提示'
              description="确认删除该项吗？"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              okText="是"
              cancelText="否"
              onConfirm={() => {
                del(reference)
              }}
            >
              <Button type="primary" danger>删除</Button>
            </Popconfirm>

          </>

        )
      }
    },
  ];


  const handleOk = async () => {
    if (modalStatus === 'update') {
      form.validateFields().then(
        async () => {
          const formDataObj = form.getFieldsValue(true)
          const param = {
            data: formDataObj
          }
          await recordApi.update(param);
          await getAllRecord(currentPage,pageSize)
          setModalStatus('')
          setIsModalOpen(false)

          form.resetFields()
        }
      )
    } else if (modalStatus === 'add') {
      form.validateFields().then(
        async () => {
          const { recordName } = form.getFieldsValue(true)
          setIsModalOpen(false)

          const recordParam = { userId, recordName }

          await recordApi.add(recordParam);
          await getAllRecord(currentPage,pageSize)
          setModalStatus('')
          setIsModalOpen(false)
          form.resetFields()
        },
        (err: any) => {
          console.log(err)
          return
        }
      )
    }

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
                <Breadcrumb
                  items={[
                    {
                      title: <Link to="/management/record">实验记录管理</Link>,
                    },
                    {
                      title: "实验记录详情",
                    }

                  ]}
                />
              </>
            }
            toolbar={{
              actions: [
                <>
                  <Button key="list" type="primary" onClick={showModal}>
                    新增
                  </Button>
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
          {/* edit & add */}
          <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              form={form}
            // onFinish={addRecord}
            >
              <Form.Item hidden name="id" label="id">
                <Input onChange={onIdChange} />
              </Form.Item>

              <Form.Item name="recordName" label="实验记录名称" rules={[{ required: true }]}>
                <Input onChange={onRecordNameChange} />
              </Form.Item>

            </Form>

          </Modal>


        </ProCard>
      </ProCard>
    </>
  );
};
