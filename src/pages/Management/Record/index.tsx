import {ProCard, ProForm, ProTable} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import * as conferenceApi from '@/services/api/conference';
import {useModel} from '@umijs/max';
import {UploadProps} from 'antd';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Row,
  Upload,
} from 'antd';
import dayjs from 'dayjs'
import * as moduleAttachmentApi from '@/services/api/moduleAttachment';
import {QuestionCircleOutlined, UploadOutlined} from '@ant-design/icons';


export default () => {

  const {initialState} = useModel('@@initialState');
  const userId = initialState?.currentUser?.userId
  const param: { [key: string]: any; } | undefined = []
  param.push(userId)
  const [conferences, setConferences]: any = useState([])

  const [users, setUsers]: any = useState()
  const [rawUsers, setRawUsers]: any = useState()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('')
  const [modalTitle, setModalTitle] = useState('')

  const [form] = ProForm.useForm()
  const [attachmentForm] = ProForm.useForm()
  const [attachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [file, setFile] = useState()


  // search
  const [searchHostNameInput, setSearchHostNameInput] = useState('')
  const [searchConferenceNameInput, setSearchConferenceNameInput] = useState('')

  const [searchTimeInput, setSearchTimeInput] = useState('')
  const [searchTimeStart, setSearchTimeStart] = useState()
  const [searchTimeEnd, setSearchTimeEnd] = useState()

  const [tableList, setTableList] = useState<any>([])

  const [attachmentList, setAttachmentList]: any = useState([])


  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };


  const showModal = () => {
    setIsModalOpen(true);
    setModalTitle('添加会议记录')
    setModalStatus('add')
  };


  const showAttachmentModal = (record: any) => {
    setIsAttachmentModalOpen(true);
    attachmentForm.setFieldsValue({id: record.id})

  }
  const showAttachmentCancel = () => {
    setIsAttachmentModalOpen(false)
    attachmentForm.resetFields()

  };

  const showEditModal = (conference: any) => {
    setIsModalOpen(true)
    setModalTitle('修改会议记录')
    setModalStatus('update')
    form.setFieldsValue({userName: conference.userName})
    form.setFieldsValue({id: conference.id})
    form.setFieldsValue({host: conference.host})
    form.setFieldsValue({name: conference.name})
    form.setFieldsValue({year: conference.year})
    form.setFieldsValue({remark: conference.remark})
  }

  const onIdChange = (e: any) => {
    const {value} = e.target
    form.setFieldsValue({id: value})
  }

  const onHostChange = (e: any) => {
    const {value} = e.target
    form.setFieldsValue({host: value})
  }

  const onNameChange = (e: any) => {
    const {value} = e.target
    form.setFieldsValue({name: value})
  }
  const onRemarkChange = (e: any) => {
    const {value} = e.target
    form.setFieldsValue({remark: value})
  }

  const onYearChange = (value: any) => {
    form.setFieldsValue({year: value})
  }


  const onRowChange = (id: string) => {

    if (attachmentList !== undefined) {
      attachmentList?.filter((ele: any) => {
        return ele.pId === id
      })
    }

  }

  const getAllConference = async () => {
    const result = await conferenceApi.get(param)
    if (result.code === 200) {
      const data = result.data.result

      setConferences(data)
      setTableList(data)
    }
    setSearchHostNameInput('')
    setSearchConferenceNameInput('')
    setSearchTimeStart(undefined)
    setSearchTimeEnd(undefined)
  }
  // const getUsers = async () => {
  //   const param = {
  //     data: {
  //       roleId: '1'
  //     }
  //   }
  //   const res: any = await userApi.getAllUserInfo(param)
  //   const result = res.data.result
  //   const usersOption : any = []
  //   setRawUsers(result)
  //   result.forEach((ele : any) => {
  //     const obj : any = {}
  //     obj.value = ele?.userId
  //     obj.label = ele?.userName
  //     usersOption.push(obj)
  //   });


  //   setUsers(usersOption)
  // }


  const get = async () => {
    await getAllConference()
    // await getUsers()
  }
  const getAttachments = async () => {
    const param = {
      type: 'conference'
    }
    const result = await moduleAttachmentApi.getAttachments(param)
    setAttachmentList(result.data.result)
  }
  useEffect(() => {
    get()
    // getAttachments()
  }, [])


  type SelectType = {
    value: string,
    label: string,
  }

  const del = async (conference: any) => {
    const res = await conferenceApi.del(conference?.id)
    if (res.code === 200) {
      message.success('删除成功')
    }
    await getAllConference()

  }


  const columns: any = [
    {
      title: '会议名称',
      key: 'name',
      dataIndex: 'name',
      search: false,
    },
    {
      title: '主持人',
      key: 'host',
      dataIndex: 'host',
      search: false,
    },
    {
      title: '会议年份',
      key: 'year',
      dataIndex: 'year',
      search: false,
    },

    {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
      search: false,
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
            <Button type="dashed" onClick={() => {
              showAttachmentModal(reference)
            }}>
              上传附件
            </Button>
            <Divider type="vertical"/>
            <Button type="primary" onClick={() => {
              showEditModal(reference)
            }}>
              编辑
            </Button>
            <Divider type="vertical"/>
            <Popconfirm
              title='提示'
              description="确认删除该项吗？"
              icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
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
          await conferenceApi.update(param);
          await getAllConference()
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
          await conferenceApi.add(param);
          await getAllConference()
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


  const importProps: UploadProps = {
    name: 'file',
    action: '/backend/import/conference',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      authorization: 'authorization-text',
    },
    data: {},
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        if (info.file.response.code === 505) {
          const list = info.file.response.data.userNotExistList
          if (list.length !== 0) {
            for (const item in list) {
              const element = list[item]
              message.error(`专家 '${element.firstAuthor}' 不存在`)
            }
          }
          return
        }
        if (info.file.response.code === 506) {
          const list = info.file.response.data.dateErrList
          if (list.length !== 0) {
            for (const item in list) {
              const element = list[item]
              message.error(`日期 ${element.publicationTime} 格式错误 (参考格式:2023-12-12)`)
            }
          }
          return
        }
        get()
        console.log(info.file, info.fileList)
        message.success(`导入成功`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }


  const delAttachment = async (record: any) => {
    const param = {data: record}
    const res = await rewardApi.delAttachment(param)
    if (res.code === 200) {
      message.success('删除成功')
    }
    await getAllConference()
  }


  const [attachments, setAttachments]: any = useState()
  const expandedRowRender = (record: any) => {

    return (
      <ProTable
        rowKey="id"
        columns={[
          {
            title: '名称', dataIndex: 'name', key: 'name',
            render: (text, attachment: any) => {
              return <a href={`/backend/staticFile/conference/${attachment.pid}/${attachment.url}`}>
                {attachment?.name}
              </a>;
            }
          },
          {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            valueType: 'option',
            render: (text, subConference) => {
              return <Popconfirm
                title='提示'
                description="确认删除该项吗？"
                icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                okText="是"
                cancelText="否"
                onConfirm={() => {
                  delAttachment(subConference);
                }}
              >
                <Button danger>删除</Button>
              </Popconfirm>;
            }
          },
        ]}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={record.moduleList}
        pagination={false}
      />
    );
  };


  const upProps: UploadProps = {
    name: 'file',
    maxCount: 1,
    // action: '/backend/api/reward/upload',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      authorization: 'authorization-text',
    },
    // data: {
    //   name: approval?.code,
    //   rewardId: projectId,
    //   type: 'approval'
    // },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        setFile(info.file)
        attachmentForm.setFieldsValue({file: info})
        // message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      // const formData = new FormData();
      // formData.append("file", info.file)
      // approvalApi.upload(info.file)
      // approvalApi.upload(formData)
    },
  }

  const uploadAttachment = () => {
    attachmentForm.validateFields().then(
      async () => {
        const formDataObj = attachmentForm.getFieldsValue(true)
        const {file, name, id} = formDataObj

        const formData = new FormData()
        formData.append('pId', id)
        formData.append('name', name)
        formData.append('file', file.file.originFileObj)
        // formData.append('file', file.file[0]);
        // formData.append('file', new Blob([file.file]));
        const param = {
          data: formData
        }
        const res
          = await conferenceApi.upload(param)
        if (res.code === 200) {
          message.success(`上传成功`);
        }
        await getAllConference()
        attachmentForm.resetFields()
        setIsAttachmentModalOpen(false)
      },
      (err) => {
        console.log(err)
        return
      }
    )
  }

  const extendNameColumn = () => {
    const arr: any = []
    tableList.forEach((element: any) => {
      users.forEach((user: any) => {
        if (user.value === element.firstAuthorId) {
          // const obj = element
          element.userName = user.label
          arr.push(element)
        }
      })

      // departments.forEach((department:any) => {
      //   if (department.value === element.departmentId) {
      //     element.departmentName = department.label
      //     arr.push(element)
      //   }
      // })

    })
    return arr
  }

  const onAttachmentIdChange = (e: any) => {
    const {value} = e.target
    attachmentForm.setFieldsValue({id: value})
  }
  const onCodeChange = (e: any) => {
    const {value} = e.target
    form.setFieldsValue({code: value})
  }
  const exportLog = () => {
    const option: any = {};
    option.fileName = "会议管理列表";
    const arr = extendNameColumn()
    option.datas = [
      {
        // sheetData: [
        //   { one: "一行一列", two: "一行二列" },
        //   { one: "二行一列", two: "二行二列" },
        // ],
        // sheetData: arr,
        sheetData: tableList,
        sheetName: "sheet",
        sheetFilter: [
          // "userName",
          "userName",
          "departmentName", "name", "applicationTime", "authorizedTime", "organization", "category", "type", "note"],
        sheetHeader: ["发明人", "科室", "专利名称", "申请时间", "授权时间", "奖励机构", "证书号", "专利类别", "备注"],
        columnWidths: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      }
    ];
    const ExportJsonExcel = require("js-export-excel");
    const toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel(); //保存
  }


  const filter = (
    hostName: any,
    conferenceName: any,
    timeStart: any,
    timeEnd: any
  ) => {
    // searchUserNameInput
    // searchRewardNameInput
    // searchTimeInput
    const newList = conferences.filter((item: any) => {
      let hostNameIndex,
        conferenceNameIndex

      if (item.host === undefined) {
        hostNameIndex = 0
      } else if (hostName === '' || hostName === undefined || hostName === null) {
        hostNameIndex = 1
      } else {
        hostNameIndex = item.host?.indexOf(hostName)
      }

      if (item.name === undefined) {
        conferenceNameIndex = 0
      } else if (conferenceName === '' || conferenceName === undefined || conferenceName === null) {
        conferenceNameIndex = 1
      } else {
        conferenceNameIndex = item.name.indexOf(conferenceName)
      }

      const startValid = timeStart === undefined || timeStart === null ? true : dayjs(item.publicationTime).isAfter(timeStart)
      const endValid = timeEnd === undefined || timeEnd === null ? true : dayjs(item.publicationTime).isBefore(timeEnd)
      const timeValid = startValid && endValid
      return hostNameIndex >= 0
        && conferenceNameIndex >= 0
        && timeValid;
    })
    setTableList(newList)
  }
  const searchHostNameChange = (e: any) => {
    const value = e.target.value
    setSearchHostNameInput(value)
    filter(value, searchConferenceNameInput, searchTimeStart, searchTimeEnd)
  }

  const searchConferenceNameChange = (e: any) => {
    const value = e.target.value
    setSearchConferenceNameInput(value)
    filter(searchHostNameInput, value, searchTimeStart, searchTimeEnd)
  }

  return (
    <>
      <ProCard boxShadow>
        <Row gutter={16}>
          <Col className="gutter-row" span={4}>
            <Input addonBefore='会议名称' value={searchConferenceNameInput}
                   onChange={searchConferenceNameChange}></Input>
          </Col>
          <Col className="gutter-row" span={4}>
            <Input addonBefore='主持人' value={searchHostNameInput} onChange={searchHostNameChange}></Input>
          </Col>

        </Row>
      </ProCard>
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
                // <Upload {...importProps}>
                //   <Button icon={<UploadOutlined />}>批量导入</Button>
                // </Upload>,
                // <Button type="primary" onClick={exportLogexportLog}>导出</Button>,
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
            expandable={
              {
                expandedRowRender: expandedRowRender,
                // onExpand: onExpandChange
              }
            }

            onRow={(reference: any) => {
              return {
                onClick: () => {
                  if (reference.id) {
                    onRowChange(reference.id);
                  }
                },
              };
            }}
          />
          {/* edit & add */}
          <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
              labelCol={{span: 6}}
              wrapperCol={{span: 16}}
              form={form}
            >
              <Form.Item hidden name="id" label="id">
                <Input onChange={onIdChange}/>
              </Form.Item>

              <Form.Item name="name" label="会议名称" rules={[{required: true}]}>
                <Input onChange={onNameChange}/>
              </Form.Item>

              <Form.Item name="host" label="主持人" rules={[{required: true}]}>
                <Input onChange={onHostChange}/>
              </Form.Item>

              <Form.Item name="year" label="会议年份" rules={[{required: true}]}>
                <InputNumber style={{width: '100%'}} onChange={onYearChange}/>
              </Form.Item>

              <Form.Item name="remark" label="备注" rules={[{required: false}]}>
                <Input onChange={onRemarkChange}/>
              </Form.Item>
            </Form>

          </Modal>

          {/* attachment */}
          <Modal title={'上传附件'} open={attachmentModalOpen} onOk={uploadAttachment} onCancel={showAttachmentCancel}>
            <Form
              labelCol={{span: 6}}
              wrapperCol={{span: 16}}
              form={attachmentForm}
            >
              <Form.Item hidden name="id" label="id">
                <Input onChange={onAttachmentIdChange}/>
              </Form.Item>
              <Form.Item name="name" label="附件名称" rules={[{required: true}]}>
                <Input onChange={onCodeChange}/>
              </Form.Item>

              <Form.Item name="file" label="附件" rules={[{required: true}]}>
                <Upload {...upProps}>
                  <Button><UploadOutlined/></Button>
                </Upload>
              </Form.Item>

            </Form>

          </Modal>
        </ProCard>
      </ProCard>
    </>
  );
};
