import { Row, Col, message, Button, Space, List, Select, Card, Tag, DatePicker,} from 'antd';
import { useEffect, React, useState, useRef } from 'react';
import { CloseOutlined, MessageOutlined, SoundOutlined, CheckOutlined, CheckCircleOutlined } from '@ant-design/icons';

// 接口
import { getAllMessageInfoByUserId, markMessageById, oneKeyMessage } from '@/services/api/message/messageInfoApi';
import { agreeRejectProject } from '@/services/api/project/projectSupplierInfoApi';

const MessageInfo: React.FC = () => {
  // 当前步骤
  const [messageApi, contextHolder] = message.useMessage();

  // 获取所有通知
  const [total, setTotal] = useState<any>(0);
  const [inquireForm, setInquireForm] = useState<any>({ isRead: 0, currentPage: 1, pageSize: 8 });
  const inquireFormRef = useRef(inquireForm);

  const [messageInfoList, setMessageInfoList] = useState<any>([]);
  const getAllMessageInfoByUserIdToll = async () => {
    const res = await getAllMessageInfoByUserId(inquireFormRef.current);
    if (res.code === 200) {
      setMessageInfoList(res.data.messages);
      setTotal(res.data.total);
    } else {
      messageApi.open({type: 'error', content: '通知获取失败！'});
    }
  }

  // 查询未读、已读
  const isReadChange = (value: string) => {
    setInquireForm((prevState: any) => { return ({ ...prevState, isRead: value })});
    inquireFormRef.current.isRead = value;
    getAllMessageInfoByUserIdToll();
  };

  // 标记已读
  const markMessageByIdToll = async (messageId: any) => {
    const res = await markMessageById({ messageId: messageId });
    if (res.code === 200) {
      getAllMessageInfoByUserIdToll();
    } else {
      messageApi.open({type: 'error', content: '标记失败！'});
    }
  }
  
  // 一键已读
  const oneKeyMessageToll = async () => {
    const res = await oneKeyMessage();
    if (res.code === 200) {
      getAllMessageInfoByUserIdToll();
    } else {
      messageApi.open({type: 'error', content: '操作失败！'});
    }
  }

  // 同意项目邀请
  const agreeRejectProjectToll = async (projectSupplierId: string, isAgree: string) => {
    const res = await agreeRejectProject({ projectSupplierId: projectSupplierId, isAgree: isAgree });
    if (res.code === 200) {
      getAllMessageInfoByUserIdToll();
    }else {
      messageApi.open({type: 'error', content: '操作失败！'});
    }
  }

  useEffect(()=>{
    getAllMessageInfoByUserIdToll();
  },[]);

  return (
    <>
      {contextHolder}
      <Card
        title={<>系统通知：<Tag color="#2db7f5"><SoundOutlined /> {total} </Tag> </>}
        size="small"
        extra={
          <Select
            style={{ width: 100, textAlign: 'left' }}
            size="small"
            onChange={isReadChange}
            placeholder="是否已读"
            value={inquireForm.isRead}
            options={[
              { value: 0, label: '未读' },
              { value: 1, label: '已读' },
            ]}
          />
        }
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div style={{ textAlign: 'right' }}>
              <Button type="primary" size="small" onClick={oneKeyMessageToll}>一键已读</Button>
            </div>
            <List
              itemLayout="vertical"
              pagination={{
                total: total,
                onChange: (page) => {
                  setInquireForm((prevState: any) => { return ({ ...prevState, currentPage: page })});
                  inquireFormRef.current.currentPage = page;
                  getAllMessageInfoByUserIdToll();
                },
                pageSize: 8,
              }}
              dataSource={messageInfoList}
              renderItem={(item: any, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<MessageOutlined style={{ fontSize: '20px', color: '#1890ff' }} />}
                    title={item.title}
                    description={item.content}
                  />
                  {
                    inquireForm.isRead === 0 &&
                      <div style={{ textAlign: 'right' }}>
                        <Space>
                          <Button type="primary" size="small" icon={<CheckCircleOutlined />} onClick={() => markMessageByIdToll(item.messageId)}>已读</Button>
                          {
                            item.type === 'INVITE_PROJECT' &&
                              <>
                                <Button
                                  type="primary"
                                  size="small"
                                  icon={<CheckOutlined />}
                                  onClick={() => agreeRejectProjectToll(item.commonId, "YES")}
                                >
                                  同意
                                </Button>
                                <Button
                                  type="primary"
                                  size="small"
                                  icon={<CloseOutlined />}
                                  onClick={() => agreeRejectProjectToll(item.commonId, "NO")}
                                  danger
                                >
                                  拒绝
                                </Button>
                              </>
                          }
                        </Space>
                      </div>
                  }
                 
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default MessageInfo;
