import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'umi';
import { ProCard, ProForm, ProTable } from '@ant-design/pro-components';
import * as soilSampleApi from '@/services/api/soilSample';
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
  Select,
  Breadcrumb,
  Tag,
  InputNumber
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


export default () => {


  const { initialState } = useModel('@@initialState');
  const userId = initialState?.currentUser?.userId
  const param: { [key: string]: any; } | undefined = []
  // param.push(userId)
  const [sampleType, setSampleType]: any = useState([])


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('')
  const [modalTitle, setModalTitle] = useState('')

  const [form] = ProForm.useForm()
  const [tableList, setTableList] = useState<any>([])

  const {recordId} = useParams()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const page = { currentPage, pageSize }

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };


  const showModal = () => {
    setIsModalOpen(true);
    setModalTitle('新增样本记录')
    setModalStatus('add')
    form.setFieldsValue({ recordId: recordId })
  };


  const showEditModal = (soilSample: any) => {
    setIsModalOpen(true)
    setModalTitle('修改样本记录')
    setModalStatus('update')
    form.setFieldsValue({ id: soilSample.id })
    form.setFieldsValue({ sampleName: soilSample.sampleName })
    form.setFieldsValue({ color: soilSample.color })
    form.setFieldsValue({ smell: soilSample.smell })
    form.setFieldsValue({ organism: soilSample.organism })
    form.setFieldsValue({ hardness: soilSample.hardness })
    form.setFieldsValue({ sizeGt2mm: soilSample.sizeGt2mm })
    form.setFieldsValue({ sizeLt2mm: soilSample.sizeLt2mm })
    form.setFieldsValue({ viscosity: soilSample.viscosity })
    form.setFieldsValue({ density: soilSample.density })
    form.setFieldsValue({ humidity: soilSample.humidity })
    form.setFieldsValue({ waterRetention: soilSample.waterRetention })
    form.setFieldsValue({ sampleTypeId: soilSample.sampleTypeId })
    // form.setFieldsValue({ sampleTypeName: soilSample.sampleTypeName })

    form.setFieldsValue({ recordId: recordId })
  }

  const onIdChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ id: value })
  }

  const onRecordIdChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ recordId: value })
  }

  const onSampleNameChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ sampleName: value })
  }
  const onSampleTypeNameChange = (e: any) => {
    form.setFieldsValue({ sampleTypeId: e })
  }
  const onColorChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ color: value })
  }
  const onSmellChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ smell: value })
  }
  const onOrganismChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ organism: value })
  }
  const onHardnessChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ hardness: value })
  }
  const onSizeGt2mmChange = (e: any) => {
    // console.log(e);
    form.setFieldsValue({ sizeGt2mm: e })
  }
  const onSizeLt2mmChange = (e: any) => {
    form.setFieldsValue({ sizeLt2mm: e })
  }
  const onViscosityChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ viscosity: value })
  }
  const onHumidityChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ humidity: value })
  }
  const onDensityChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ density: value })
  }
  const onWaterRetentionChange = (e: any) => {
    const { value } = e.target
    form.setFieldsValue({ waterRetention: value })
  }

  const getAllSoilSample = async () => {
    const result = await soilSampleApi.list(page,recordId)

    if (result.code === 200) {
      const data = result.data.result
      setTableList(data)
    }
  }

  const listSampleType = async () => {
    const result = await sampleTypeApi.list()

    if (result.code === 200) {
      const data = result.data.result
      setSampleType(data)
    }
  }


  const init = async () => {
    await getAllSoilSample()
    await listSampleType()
  }
  useEffect(() => {
    init()

  }, [])


  const del = async (soilSample: any) => {

    const res = await soilSampleApi.del(soilSample.id)
    if (res.code === 200) {
      message.success('删除成功')
    }
    await getAllSoilSample()

  }


  const columns: any = [
    {
      title: '样本名称',
      key: 'sampleName',
      dataIndex: 'sampleName',
      search: false,
      align: "center",
    },
    {
      title: '样本类型',
      key: 'sampleTypeName',
      dataIndex: 'sampleTypeName',
      search: false,
      align: "center",
      render: (text: any, soilSample: any) => {
        return (
          <>
            <Tag color='cyan'>{text}</Tag>
          </>
        )
      }
    },
    {
      title: '颜色',
      key: 'color',
      dataIndex: 'color',
      search: false,
      align: "center"
    },
    {
      title: '气味',
      key: 'smell',
      dataIndex: 'smell',
      search: false,
      align: "center"
    },


    {
      title: '生物种类',
      key: 'organism',
      dataIndex: 'organism',
      search: false,
      align: "center"
    },
    {
      title: '颗粒硬度',
      key: 'hardness',
      dataIndex: 'hardness',
      search: false,
      align: "center"
    },
    {
      title: '颗粒大小(>2mm)',
      key: 'sizeGt2mm',
      dataIndex: 'sizeGt2mm',
      search: false,
      align: "center"
    },
    {
      title: '颗粒大小(<2mm)',
      key: 'sizeLt2mm',
      dataIndex: 'sizeLt2mm',
      search: false,
      align: "center"
    },
    {
      title: '黏度',
      key: 'viscosity',
      dataIndex: 'viscosity',
      search: false,
      align: "center"
    },
    {
      title: '湿度',
      key: 'humidity',
      dataIndex: 'humidity',
      search: false,
      align: "center"
    },
    {
      title: '湿度',
      key: 'humidity',
      dataIndex: 'humidity',
      search: false,
      align: "center"
    },
    {
      title: '紧实度',
      key: 'density',
      dataIndex: 'density',
      search: false,
      align: "center"
    },
    {
      title: '保水性',
      key: 'waterRetention',
      dataIndex: 'waterRetention',
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
      align: 'center',
      fixed: 'right',
      search: false,
      render: (text: any, soilSample: any) => {
        return (
          <>

            <Divider type="vertical" />
            <Button type="primary" onClick={() => {
              showEditModal(soilSample)
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
                del(soilSample)
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
          // console.log(param);

          await soilSampleApi.update(param);
          await getAllSoilSample()
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
          // console.log(param);

          await soilSampleApi.add(param);
          await getAllSoilSample()
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
                      title: <Link to="/myRecord">实验记录管理</Link>,
                    },
                    {
                      title: <Link to={`/myRecord/${recordId}`}>实验记录详情</Link>,
                    },
                    {
                      title: "样本记录详情",
                    }
                  ]}
                />
              </>
            }
            toolbar={{
              actions: [
                <Button key="list" type="primary" onClick={showModal}>
                  新增
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

              <Form.Item hidden name="recordId" label="recordId">
                <Input onChange={onRecordIdChange} />
              </Form.Item>

              <Form.Item name="sampleName" label="样本名称" rules={[{ required: true }]}>
                <Input onChange={onSampleNameChange} />
              </Form.Item>

              <Form.Item name="sampleTypeId" label="样本类型" rules={[{ required: true, message: '请选择样本类型' }]}>
                <Select
                  // loading={loading}
                  optionFilterProp="children"
                  options={sampleType.map((item: any) => ({
                    value: item.id,
                    label: item.sampleTypeName,
                  }))}
                  onChange={onSampleTypeNameChange}
                />
              </Form.Item>

              <Form.Item name="color" label="颜色" rules={[{ required: true }]}>
                <Input onChange={onColorChange} />
              </Form.Item>

              <Form.Item name="smell" label="气味" rules={[{ required: true }]}>
                <Input onChange={onSmellChange} />

              </Form.Item>
              <Form.Item name="organism" label="生物种类" rules={[{ required: true }]}>
                <Input onChange={onOrganismChange} />

              </Form.Item>

              <Form.Item name="hardness" label="颗粒硬度" rules={[{ required: true }]}>
                <Input onChange={onHardnessChange} />
              </Form.Item>

              <Form.Item name="sizeGt2mm" label="颗粒大小(>2mm)" rules={[{ required: true }]}>
                <InputNumber<string>
                  // defaultValue="1.00"
                  // style={{ width: 100 }}
                  min="0"
                  max="50.00"
                  step="0.01"
                  onChange={onSizeGt2mmChange}
                  stringMode
                />
              </Form.Item>

              <Form.Item name="sizeLt2mm" label="颗粒大小(<2mm)" rules={[{ required: true }]}>
                <InputNumber<string>
                  // defaultValue="1.00"
                  // style={{ width: 100 }}
                  min="0"
                  max="10.00"
                  step="0.01"
                  onChange={onSizeLt2mmChange}
                  stringMode
                />
              </Form.Item>

              <Form.Item name="viscosity" label="黏度" rules={[{ required: true }]}>
                <Input onChange={onViscosityChange} />
              </Form.Item>

              <Form.Item name="humidity" label="湿度" rules={[{ required: true }]}>
                <Input onChange={onHumidityChange} />
              </Form.Item>

              <Form.Item name="density" label="紧实度" rules={[{ required: true }]}>
                <Input onChange={onDensityChange} />
              </Form.Item>

              <Form.Item name="waterRetention" label="保水性" rules={[{ required: true }]}>
                <Input onChange={onWaterRetentionChange} />
              </Form.Item>

            </Form>

          </Modal>


        </ProCard>
      </ProCard>
    </>
  );
};

