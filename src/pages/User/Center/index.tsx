import { Card, Tag, Row, Col, Form, message, Space, Input, Button, Spin, Select, Popconfirm, Tabs} from 'antd';
import { useEffect, React, useState, useRef } from 'react';
import { useParams } from 'umi';
import md5 from 'js-md5';

import {
  getAllUserInfo,
  getUserInfoByUserId,
  registerUser,
  modifyUserInfo,
  delUserInfoByUserId
} from '@/services/api/user/userApi';


const UserHome: React.FC = () => {

  const params = useParams();

  const [messageApi, contextHolder] = message.useMessage();

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };
  
  const tailLayout = {
    wrapperCol: { offset: 15, span: 8 },
  };

  const getUserInfoByUserIdToll = async() => {
    const res = await getUserInfoByUserId({ userId: "" })
    if (res.code === 200) {
      const userInfo = res.data.userInfo;
      userInfo.oldPassWord = "";
      userInfoForm.setFieldsValue(userInfo);
    } else {
      messageApi.open({type: 'error', content: '账号信息获取失败！'});
    }
  }

  const [userInfoForm] = Form.useForm();
  const modifyUserInfoToll = async (param: any) => {
    if ((param.passWord !== "" && param.passWord !== undefined) || (param.verifyPassWord !== "" && param.verifyPassWord !== undefined)) {
      if (param.oldPassWord === "" || param.oldPassWord === undefined) {
        messageApi.open({type: 'warning', content: '旧密码不能为空！'});
        return false;
      }

      if (param.passWord !== param.verifyPassWord) {
        messageApi.open({type: 'warning', content: '两次密码不一致！'});
        return false;
      }

      param.passWord = md5(param.passWord);
      param.oldPassWord = md5(param.oldPassWord);
    };

    const res = await modifyUserInfo(param);
    if (res.code === 200) {
      messageApi.open({type: 'success', content: '更新成功！'});
    } else {
      messageApi.open({type: 'error', content: res.msg});
    }
  };

  useEffect(()=>{
    getUserInfoByUserIdToll()
  },[]);

  return (
    <>
      {contextHolder}
      <Card title="账号基本信息">
        <Form
          {...layout}
          form={userInfoForm}
          onFinish={modifyUserInfoToll}
        >
          <Form.Item name="name" label="账号名称" rules={[{ required: false }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="手机号码" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="oldPassWord" label="旧密码" rules={[{ required: false }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="passWord" label="新密码" rules={[{ required: false }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="verifyPassWord" label="确认新密码" rules={[{ required: false }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button" onClick={() => {userInfoForm.resetFields()}}>
                重置
              </Button>
            </Space>
            </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default UserHome;
