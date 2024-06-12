import { ProCard, ProForm, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import * as sampleTypeApi from '@/services/api/sampleType';
import { useModel } from '@umijs/max';
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
  const [sampleType, setSampleType]: any = useState([])


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [form] = ProForm.useForm()


  // search
  const [searchSampleTypeNameInput, setSearchSampleTypeNameInput] = useState('')
  const [tableList, setTableList] = useState<any>([])


  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };


  const showModal = () => {
    setIsModalOpen(true);
    setModalTitle('添加样本类型')
    setModalStatus('add')
  };


  const showEditModal = (sampleType: any) => {
    setIsModalOpen(true)
    setModalTitle('修改样本类型')
    setModalStatus('update')
    form.setFieldsValue({ id: sampleType.id })
    form.setFieldsValue({ sampleTypeName: sampleType.sampleTypeName })

  }

  const onIdChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ id: value })
  }

  const onSampleTypeNameChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ sampleTypeName: value })
  }

  const listSampleType = async () => {
    const result = await sampleTypeApi.list(param)
    if (result.code === 200) {
      const data = result.data.result

      setSampleType(data)
      setTableList(data)
    }
    setSearchSampleTypeNameInput('')
  }


  useEffect(() => {
    listSampleType().then(data => {
      // console.log(data)
    })
  }, [])


  const del = async (sampleType: any) => {
    const res = await sampleTypeApi.del(sampleType?.id)
    if (res.code === 200) {
      message.success('删除成功')
    }
    await listSampleType()

  }


  const columns: any = [
    {
      title: '样本类型',
      key: 'sampleTypeName',
      dataIndex: 'sampleTypeName',
      search: false,
      align: 'center',
      render: (text: any) => {
        return (
          <Tag color='cyan'>{text}</Tag>
        )
      }
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      search: false,
      align: 'center'
    },
    {
      title: '更新时间',
      key: 'updateTime',
      dataIndex: 'updateTime',
      search: false,
      align: 'center'
    },
    {
      title: '操作',
      key: 'operation',
      width: '300px',
      align: 'center',
      fixed: 'right',
      search: false,
      render: (text: any, sampleType: any) => {
        return (
          <>
            <Divider type="vertical" />
            <Button type="primary" onClick={() => {
              showEditModal(sampleType)
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
                del(sampleType)
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
          await sampleTypeApi.update(param);
          await listSampleType()
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

          await sampleTypeApi.add(param);
          await listSampleType()
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
    typeName: any,
  ) => {
    const newList = sampleType.filter((item: any) => {
      let sampleTypeNameIndex

      if (item.sampleTypeName === undefined) {
        sampleTypeNameIndex = 0
      } else if (typeName === '' || typeName === undefined || typeName === null) {
        sampleTypeNameIndex = 1
      } else {
        sampleTypeNameIndex = item.sampleTypeName.indexOf(typeName)
      }
      return sampleTypeNameIndex >= 0
    })
    setTableList(newList)
  }

  const searchSampleTypeNameChange = (e: any) => {
    const value = e.target.value
    setSearchSampleTypeNameInput(value)
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
                <Input addonBefore='样本类型' value={searchSampleTypeNameInput}
                  onChange={searchSampleTypeNameChange}></Input>
              </>
            }
            toolbar={{
              actions: [
                <Button key="list" type="primary" onClick={showModal}>
                  新建
                </Button>
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

              <Form.Item name="sampleTypeName" label="样本类型" rules={[{ required: true }]}>
                <Input onChange={onSampleTypeNameChange} />
              </Form.Item>

            </Form>

          </Modal>

        </ProCard>
      </ProCard>
    </>
  );
};
