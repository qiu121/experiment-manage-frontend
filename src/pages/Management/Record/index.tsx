import { ProCard, ProForm, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import * as recordApi from '@/services/api/record';
import { useModel } from '@umijs/max';
import { Link } from 'umi';

import {
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
  const userId = initialState?.currentUser?.userId
  const param: { [key: string]: any; } | undefined = []
  param.push(userId)
  const [record, setRecord]: any = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('')
  const [modalTitle, setModalTitle] = useState('')

  const [form] = ProForm.useForm()


  // search
  const [searchUserameInput, setSearchUserameInput] = useState('')

  const [tableList, setTableList] = useState<any>([])


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
    form.setFieldsValue({ name: record.name })
    form.setFieldsValue({ username: record.username })
    form.setFieldsValue({ status: record.status })
    form.setFieldsValue({ createTime: record.createTime })
    form.setFieldsValue({ updateTime: record.updateTime })
  }

  const onIdChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ id: value })
  }

  const onNameChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ name: value })
  }

  const getAllRecord = async () => {
    const result = await recordApi.listRecord()
    if (result.code === 200) {
      const data = result.data.result

      setRecord(data)
      setTableList(data)
    }
    setSearchUserameInput('')
  }


  const get = async () => {
    await getAllRecord()
  }
  useEffect(() => {
    get()
  }, [])


  const del = async (record: any) => {
    const res = await recordApi.del(record?.id)
    if (res.code === 200) {
      message.success('删除成功')
    }
    await getAllRecord()

  }


  const columns: any = [
    // {
    //   title: '实验记录名称',
    //   key: 'name',
    //   dataIndex: 'name',
    //   search: false,
    //   align: "center"
    // },
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
              <Link to={`/management/record/${record.id}`} >{text}</Link>
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
            {text === '待完成' ? (
              <Tag color='processing'>{text}</Tag>
            ) : (
              <Tag color='success'>{text}</Tag>
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

    {
      title: '操作',
      key: 'operation',
      width: '300px',
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
          await getAllRecord()
          setModalStatus('')
          setIsModalOpen(false)

          form.resetFields()
        }
      )
    } else if (modalStatus === 'add') {
      form.validateFields().then(
        async () => {
          const formDataObj = form.getFieldsValue(true)
          setIsModalOpen(false)
          const param = {
            data: formDataObj
          }
          await recordApi.add(param);
          await getAllRecord()
          setModalStatus('')
          setIsModalOpen(false)
          form.resetFields()
        },
        (err) => {
          console.log(err)
          return
        }
      )
    }


  }

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
                  <Button key="list" type="primary" onClick={showModal}>
                    新建
                  </Button>
                </>
              ],
            }}

            search={false}
            pagination={{
              pageSize: 10,
              onChange: (page) => console.log(page),
            }}

          />
          {/* edit & add */}
          <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              form={form}
            >
              <Form.Item hidden name="id" label="id">
                <Input onChange={onIdChange} />
              </Form.Item>

              <Form.Item name="name" label="实验记录名称" rules={[{ required: true }]}>
                <Input onChange={onNameChange} />
              </Form.Item>

              {/* <Form.Item name="useraame" label="提交人" rules={[{required: true}]}>
                <Input onChange={onHostChange}/>
              </Form.Item> */}

            </Form>

          </Modal>


        </ProCard >
      </ProCard>
    </>
  );
};
