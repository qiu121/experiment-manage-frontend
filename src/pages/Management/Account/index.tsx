import { ProCard } from '@ant-design/pro-components'
import React, { useEffect, useState } from 'react'
import * as userApi from '@/services/api/user/userApi'
import type { ColumnsType } from 'antd/es/table'
import {  Space, Button, Popconfirm, message,Table, Modal } from 'antd'
import { Input, Form } from 'antd'

export default () => {
  const [users, serUsers] : any = useState([])

  const get = async() => {
    const res = await userApi.getAllUserInfo({data: {id: 1}})
    const result = res.data.result
    serUsers(result)
  }

  useEffect(() => {
    get()
  }, [])
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const del = async (record: any) => {
    const arr = []
    arr.push(record.userId)
    const param ={
      data: arr
    }
    const res = await userApi.delById(param)
    get()
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '学号',
      dataIndex: 'userName',
      key: 'userName',
      align:"center"
    },
    {
      title: '昵称',
      dataIndex: 'name',
      key: 'name',
      align:"center"
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align:"center"
    },

    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
      align:"center"
    },

    {
      title: '操作',
      align:'center',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            placement="top"
            title=""
            description="确认删除吗"
            okText="是"
            cancelText="否"
            onConfirm={() => {del(record)}}
          >
            <Button danger >删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];



  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const handleOk = async() => {
    form.validateFields().then(
      async (result) => {
        const { userName, name, password, confirmPassword, email, phone,departmentA,departmentB,departmentC } = form.getFieldsValue(true)
        if (password !== confirmPassword) {
          message.error('确保密码一致')
          return
        }
        setIsModalOpen(false)

        const projectDObject : any = {
          userName: userName,
          name: name,
          password: password,
          email: email,
          phone: phone,
        }
        const param = {
          data: projectDObject
        }
        // res = await approvalApi.addProjectApproval(param)
        const res = await userApi.register(param)
        if (res.code === 1202) {
          message.error('账号已存在')
        }
        get()
        form.resetFields()
      },
      (err) => {
        form.resetFields()
        return
      }
    )
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const showModal = () => {
    setIsModalOpen(true)
  }


  const onUserNameChange = (e : any) => {
    const {value} = e.currentTarget
    form.setFieldsValue({ userName: value })
  }

  const onNameChange = (e : any) => {
    const {value} = e.currentTarget
    form.setFieldsValue({ name: value })
  }


  const onPasswordChange = (e : any) => {
    const {value} = e.currentTarget
    form.setFieldsValue({ password: value })
  }

  const onConfirmPasswordChange = (e : any) => {
    const {value} = e.currentTarget
    form.setFieldsValue({ confirmPassword: value })
  }
  const onEmailChange = (e : any) => {
    const {value} = e.currentTarget
    form.setFieldsValue({ email: value })
  }
  const onPhoneChange = (e : any) => {
    const {value} = e.currentTarget
    form.setFieldsValue({ phone: value })
  }

  return (
    <ProCard boxShadow split="vertical">
      <ProCard extra={
        <Button type='primary' onClick={showModal} >注册账号</Button>
      }>
        <Table rowKey='userId' columns={columns} dataSource={users} />

      </ProCard>
      <Modal title="账号注册" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} layout="vertical">
            <Form.Item  name="userName" label="学号" rules={[{ required: true }]} >
              <Input onChange={onUserNameChange} />
            </Form.Item>

            <Form.Item name="name" label="昵称" rules={[{ required: true }]}>
              <Input onChange={onNameChange} />
            </Form.Item>

            <Form.Item name="password" label="密码" rules={[{ required: true}]}>
              <Input.Password onChange={onPasswordChange}/>
            </Form.Item>
            <Form.Item name="confirmPassword" label="确认密码" rules={[{ required: true}]}>
              <Input.Password onChange={onConfirmPasswordChange}/>
            </Form.Item>

            <Form.Item name="email" label="邮箱" rules={[{ required: true}]}>
              <Input onChange={onEmailChange}/>
            </Form.Item>
            <Form.Item name="phone" label="手机" >
              <Input onChange={onPhoneChange}/>
            </Form.Item>

          </Form>
        </Modal>
    </ProCard>
  )
}
