import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Card, message, Tabs} from 'antd';
import * as userApi from '@/services/api/user/userApi';
import common from '@/enum/common'
import type {TabsProps} from 'antd';


const formItemLayout = {
  labelCol: {span: 2, offset: 1},
  wrapperCol: {span: 16},
};


const formTailLayout = {
  labelCol: {span: 1},
  wrapperCol: {span: 1, offset: 3},
};


type FieldType = {
  name?: string;
  gender?: string;
  phone?: string;
  email?: string;
};


export default () => {
  const [description, setDescription] = useState('');

  function onNotificationClick(message: any) {
    // your logic to handle the notification click
    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }

  const NodeA = () => {
    const [form] = Form.useForm()
    const findUserInfo = async () => {
      const result = await userApi.findUserInfo()
      const {user} = result.data
      form.setFieldValue('name', user.name)
      form.setFieldValue('email', user.email)
      form.setFieldValue('gender', user.gender)
      form.setFieldValue('phone', user.phone)
    }

    useEffect(() => {
      findUserInfo()
    }, []);

    const submit = async () => {
      form.validateFields().then(
        async (result) => {
          const {name, gender, phone, email} = form.getFieldsValue(true);
          const formData = new FormData()
          formData.append('name', name)
          formData.append('gender', gender)
          formData.append('phone', phone)
          formData.append('email', email)
          const param = {data: formData}
          const res = await userApi.updateUserInfo(param).catch((err) => {
            message.error(common.ADDFAILED)
          })
          if (res.code === 200) {
            message.success(common.ADDSUCCESS)
          }
        },
        (err) => {
          form.resetFields()
          return
        }
      )

    }

    return (
      <Card>
        <Form
          form={form}
        >
          <Form.Item<FieldType>
            {...formItemLayout}
            label="名字"
            name="name"
            rules={[{required: true, message: '请输入名字'}]}
          >
            <Input/>
          </Form.Item>

          {/* <Form.Item<FieldType>
            {...formItemLayout}
            label="性别"
            name="gender"
            rules={[{ required: true, message: '请输入性别' }]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item<FieldType>
            {...formItemLayout}
            label="email"
            name="email"
            rules={[{required: true, message: '请输入邮箱'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item<FieldType>
            {...formItemLayout}
            label="手机"
            name="phone"
            rules={[{required: true, message: '请输入手机号'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            {...formTailLayout}
          >
            <Button type="primary" htmlType="submit" onClick={submit}>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }


  const NodeB = () => {
    const [form] = Form.useForm()

    const onFinish = async (values: any) => {
      const {oldPwd, newPwd, confirmPassword} = values
      if (newPwd !== confirmPassword) {
        message.error('请确保新密码输入一致')
        return
      }
      // const param = {data: values}
      const param = {params: values}
      const res = await userApi.updatePwd(param)
      if (res.code == 200) {
        message.success('密码更新成功，下次登录生效')
        form.setFieldValue('oldPwd', common.EMPTY_STRING)
        form.setFieldValue('newPwd', common.EMPTY_STRING)
        form.setFieldValue('confirmPassword', common.EMPTY_STRING)
      } else if (res.code === 10005) {
        message.error('旧密码错误')
      } else {
        message.error('密码更新失败')
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      message.error('请确保必填项填写正确')
      return
    };

    return (
      <Card>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item
            {...formItemLayout}
            label="旧密码"
            name="oldPwd"
            rules={[{required: true, message: '请输入旧密码'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="新密码"
            name="newPwd"
            rules={[{required: true, message: '请输入新密码'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="确认密码"
            name="confirmPassword"
            rules={[{required: true, message: '请确认新密码'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            {...formTailLayout}
          >
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '修改信息',
      children: <NodeA/>,
    },

    {
      key: '2',
      label: '修改密码',
      children: <NodeB/>,
    },

  ];

  return (

    <>
      <Tabs defaultActiveKey="1" items={items}/>
    </>
  )


}





