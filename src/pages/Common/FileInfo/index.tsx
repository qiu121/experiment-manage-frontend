import { Modal, message, Button, Space, Table, Popconfirm, Card, Upload } from 'antd';
import { useEffect, React, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

// 接口
import { getAllFileInfoByCommonId, delFileInfoById } from '@/services/api/common/commonApi';

type props = {
  cardTitle: string;
  module: string;
  commonId: string;
  isManage: boolean;
  scroll?: any;
  isRefresh: any;
};

const FileInfo: React.FC = (data: props) => {
  // 消息
  const [messageApi, contextHolder] = message.useMessage();

  // 根据id获取所有文件列表
  const [fileInfos, setFileInfos] = useState<any>();
  const getAllFileInfoByCommonIdToll = async () => {
    const res = await getAllFileInfoByCommonId(data.commonId);
    if (res.code === 200) {
      setFileInfos(res.data.fileInfos);
    } else {
      messageApi.open({type: 'error', content: '文件列表获取失败！'});
    }
  }

  // 文件列表
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const uploadChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1);
    newFileList = newFileList.map((file) => {
      const res = file.response;
      if (res !== undefined) {
        if (res.code === 200) {
          file.status = 'done';
          message.success(`${info.file.name} 上传成功！`);
          getAllFileInfoByCommonIdToll();
        } else {
          file.status = 'error'
          message.error(`${info.file.name} 上传失败！`);
        }
      }
      return file;
    });
    setFileList(newFileList);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    action: `/backend/api/fileInfo/addFileInfo?module=${data.module}&commonId=${data.commonId}`,
    headers: {
      'AUTH_TOKEN': localStorage.getItem('token'),
    },
    onChange: uploadChange,
    multiple: true
  };

  // 文件上传
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const showAddModal = () => {
    setFileList([]);
    setIsAddModalOpen(true);
  }

  // 文件删除
  const delFileInfoByIdToll = async (fileId: string) => {
    const res = await delFileInfoById(fileId);
    if (res.code === 200) {
      message.success('删除成功！');
      getAllFileInfoByCommonIdToll();
    } else {
      message.error('删除失败！');
    }
  }

  const columns = [
    {
      title: '文件名称',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: '上传时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_:any, record:any) => (
        <Space size="middle">
          <a href={'/backend/api/fileInfo/download?fileId=' + record.fileId}>下载</a>
          {
            data.isManage &&
              <Popconfirm
                title="文件删除"
                description="删除后无法恢复，确定要删除文件吗?"
                onConfirm={() => delFileInfoByIdToll(record.fileId)}
                okText="确定"
                cancelText="取消"
              >
                <a style={{ color: 'red' }}>删除</a>
              </Popconfirm>
          }  
        </Space>
      ),
    },
  ];

  const handleCancel = () => {
    setIsAddModalOpen(false);
  };

  useEffect(()=>{
    getAllFileInfoByCommonIdToll();
  },[data.isRefresh]);

  return (
    <>
      {contextHolder}
      <Card
        title={data.cardTitle}
        size="small"
        extra={
          data.isManage &&
            <Button size="small" onClick={showAddModal}>上传文件</Button>
        }
      >
        <Table 
          columns={columns}
          dataSource={fileInfos}
          pagination={false}
          scroll={data.scroll}
        >
        </Table>
      </Card>

      {/** 新增文件 */}
      <Modal
        title="文件上传"
        open={isAddModalOpen}
        onCancel={handleCancel}
        footer
        bodyStyle={{ textAlign: 'center' }}
      >
        <Upload {...uploadProps} fileList={fileList}>
          <Button icon={<UploadOutlined />}>请选择需要上传的文件</Button>
        </Upload>
      </Modal>
    </>
  );
};

export default FileInfo;
