import { Card, Row, Col, Tag, message, Modal, Input, Select, Space, Button, Table, Popconfirm, Spin, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, React, useState, useRef } from 'react';
import md5 from 'js-md5';
// 接口
import {
  getAllUserInfo,
  getUserInfoByUserId,
  registerUser,
  modifyUserInfo,
  delUserInfoByUserId
} from '@/services/api/user/userApi';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const tailLayout = {
  wrapperCol: { offset: 17, span: 8 },
};

const ProjectType: React.FC = () => {
  // 消息
  const [messageApi, contextHolder] = message.useMessage();

  // 加载状态
  const [spinLoading, setSpinLoading] = useState<boolean>(false);

  // 账号列表
  const [pagination, setPagination] = useState<any>({ current: 1, pageSize: 10, total: 0 });
  const [inquireForm, setInquireForm] = useState<any>({ userName: '', name: '', status: null, currentPage: 1, pageSize: 10 });
  const inquireFormRef = useRef(inquireForm);

  // 获取账号信息
  const [userInfoList, setUserInfoList] = useState<any>([]);
  const getAllUserInfoToll = async () => {
    setSpinLoading(true);
    const res = await getAllUserInfo(inquireFormRef.current);
    if (res.code === 200) {
      setUserInfoList(res.data.userInfoList)
      setPagination((prevState: any) => { return ({ ...prevState, total: res.data.total }) })
    } else {
      messageApi.open({ type: 'error', content: '账号列表获取失败！' });
    }
    setSpinLoading(false);
  }

  // 设置查询值
  const inquireFormChange = (e: any) => {
    const name = e.target.name;
    setInquireForm((prevState: any) => { return ({ ...prevState, [name]: e.target.value }) })
    inquireFormRef.current[name] = e.target.value
  };

  const statusChange = (value: any) => {
    setInquireForm((prevState: any) => { return ({ ...prevState, status: value }) })
    inquireFormRef.current.status = value
  };

  // 分页
  const handleTableChange = (item: any) => {
    setInquireForm((prevState: any) => { return { ...prevState, currentPage: item.current } });
    inquireFormRef.current.currentPage = item.current;
    setPagination((prevState: any) => { return { ...prevState, current: item.current } });
    getAllUserInfoToll();
  };

  // 重置
  const rest = async () => {
    let param = { userName: '', name: '', status: null, currentPage: 1, pageSize: 10 };
    setInquireForm((prevState: any) => { return { ...prevState, ...param } });
    inquireFormRef.current = param;
    getAllUserInfoToll();
  };


  const [userInfoForm] = Form.useForm();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // 新增
  const addProjectTypeModal = () => {
    userInfoForm.resetFields()
    setIsAddModalOpen(true);
  };
  // 提交
  const registerUserToll = async (param: any) => {
    debugger
    if (param.passWord !== param.verifyPassWord) {
      messageApi.open({ type: 'warning', content: '两次密码不一致！' });
      return false;
    }
    debugger
    param.passWord = md5(param.passWord);
    const res = await registerUser(param);
    if (res.code === 200) {
      messageApi.open({ type: 'success', content: '账号新增成功！' });
      setIsAddModalOpen(false);
      userInfoForm.resetFields();
      getAllUserInfoToll();
    } else if (res.code === 100002) {
      messageApi.open({ type: 'warning', content: '密码长度小于8位！' });
    } else if (res.code === 100003) {
      messageApi.open({ type: 'warning', content: '账号已存在！' });
    } else {
      messageApi.open({ type: 'error', content: '账号新增失败！' });
    }
  };

  // 更新
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const modifyUserInfoModal = async (userId: string) => {
    const res = await getUserInfoByUserId({ userId: userId })
    if (res.code === 200) {
      setUserId(userId);
      userInfoForm.setFieldsValue({ ...res.data.userInfo });
      setIsModifyModalOpen(true);
    } else {
      messageApi.open({ type: 'error', content: '账号信息获取失败！' });
    }
  };

  const modifyUserInfoToll = async (param: any) => {
    param.userId = userId;
    if ((param.passWord !== "" && param.passWord !== undefined) || (param.verifyPassWord !== "" && param.verifyPassWord !== undefined)) {
      if (param.passWord !== param.verifyPassWord) {
        messageApi.open({ type: 'warning', content: '两次密码不一致！' });
        return false;
      }
      param.passWord = md5(param.passWord);
    };

    const res = await modifyUserInfo(param);
    if (res.code === 200) {
      messageApi.open({ type: 'success', content: '更新成功！' });
      setIsModifyModalOpen(false);
      getAllUserInfoToll()
    } else {
      messageApi.open({ type: 'error', content: '更新失败！' });
    }
  };

  // 删除用户
  const delUserInfoByUserIdToll = async (userId: string) => {
    const res = await delUserInfoByUserId({ userId: userId });
    if (res.code === 200) {
      messageApi.open({ type: 'success', content: '删除成功！' });
      getAllUserInfoToll();
    } else {
      messageApi.open({ type: 'error', content: '删除失败！' });
    }
  }

  const columns: any = [
    {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName',
      align: "center",
      render: (_, record: any) => (
        <>{record.userName}</>
      ),
    },
    {
       title: '名称', 
      dataIndex: 'name',
       key: 'name' ,
       align:"center",
      },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      align: "center",
      render: (text: any) => <span>{text.roleName}</span>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: "center",
      render: (text: any) => <Tag color={(text === 1 ? '#87d068' : '#f50')}>{(text === 1 ? '正常' : '封禁')}</Tag>
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      align: "center",
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align: "center",
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      // width: '130px',
      align:"center",
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => modifyUserInfoModal(record.userId)}>更新</a>
          <Popconfirm
            title="删除账号"
            description="删除之后无法恢复，确定要删除账号吗？"
            onConfirm={() => delUserInfoByUserIdToll(record.userId)}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  const handleCancel = () => {
    setIsAddModalOpen(false);
    setIsModifyModalOpen(false);
  };

  useEffect(() => {
    getAllUserInfoToll();
  }, []);

  return (
    <>
      {contextHolder}
      <Spin spinning={spinLoading}>
        <Card bodyStyle={{ padding: '10px 15px 10px 15px', textAlign: 'right' }}>
          <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={addProjectTypeModal}>新增</Button>
              </Space>
            </Col>
            <Col span={12}>
              <Space>
                <Input
                  value={inquireForm.userName}
                  placeholder="账号"
                  name='userName'
                  onChange={inquireFormChange}
                />
                <Input
                  value={inquireForm.name}
                  name='name'
                  placeholder="名称"
                  onChange={inquireFormChange}
                />
                <Select
                  style={{ width: '100px', textAlign: 'left' }}
                  placeholder="状态"
                  value={inquireForm.status}
                  onChange={statusChange}
                  options={[
                    { value: 1, label: '正常' },
                    { value: 0, label: '封禁' },
                  ]}
                />
                <Button id="inquireButton" type="primary" onClick={getAllUserInfoToll}>查询</Button>
                <Button onClick={rest}>重置</Button>
              </Space>
            </Col>
          </Row>
          <Table
            rowKey={(record) => record.userId}
            pagination={pagination}
            dataSource={userInfoList}
            columns={columns}
            onChange={handleTableChange}
          />
        </Card>
      </Spin>

      {/* 新增账号 */}
      <Modal title="新增账号" footer open={isAddModalOpen} onCancel={handleCancel}>
        <Form
          {...layout}
          form={userInfoForm}
          onFinish={registerUserToll}
        >
          <Form.Item name="userName" label="账号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="账号名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="roleId" label="角色" rules={[{ required: true }]}>
            <Select
              style={{ width: '100%' }}
              options={[
                { value: 0, label: '系统管理员' },
                { value: 1, label: '维护人员' },
                { value: 2, label: '用户' },
              ]}
              // options={SpeechRecognitionResultList.map(item:any)=>({
              //   value:item.id,
              //   label:item.roleName,
              // })}
            />
          </Form.Item>
          <Form.Item name="phone" label="手机号码" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="passWord" label="密码" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="verifyPassWord" label="确认密码" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button" onClick={() => { userInfoForm.resetFields() }}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 更新账号 */}
      <Modal title="更新账号信息" footer open={isModifyModalOpen} onCancel={handleCancel}>
        <Form
          {...layout}
          form={userInfoForm}
          onFinish={modifyUserInfoToll}
        >
          <Form.Item name="userName" label="账号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="账号名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="roleId" label="角色" rules={[{ required: true }]}>
            <Select
              style={{ width: '100%' }}
              options={[
                { value: 0, label: '系统管理员' },
                { value: 1, label: '项目管理员' }
              ]}
            />
          </Form.Item>
          <Form.Item name="status" label="状态" rules={[{ required: true }]}>
            <Select
              style={{ width: '100%' }}
              options={[
                { value: 1, label: '正常' },
                { value: 0, label: '封禁' },
              ]}
            />
          </Form.Item>
          <Form.Item name="phone" label="手机号码" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="passWord" label="密码" rules={[{ required: false }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="verifyPassWord" label="确认密码" rules={[{ required: false }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button" onClick={() => { userInfoForm.resetFields() }}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectType;
