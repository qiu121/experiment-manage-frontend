// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前用户所有通知 POST /api/messageInfo/getAllMessageInfoByUserId */
export async function getAllMessageInfoByUserId(options?: { [key: string]: any }) {
  return request('/backend/api/messageInfo/getAllMessageInfoByUserId', {
    method: 'POST',
    data: options
  });
}

/** 标记通知以读 GET /api/messageInfo/markMessageById */
export async function markMessageById(options: { messageId: string }) {
  return request('/backend/api/messageInfo/markMessageById?messageId=' + options.messageId , {
    method: 'GET',
  });
}

/** 标记通知以读 GET /api/messageInfo/oneKeyMessage */
export async function oneKeyMessage() {
  return request('/backend/api/messageInfo/oneKeyMessage', {
    method: 'GET',
  });
}
