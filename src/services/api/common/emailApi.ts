import { request } from '@umijs/max';

/** 发送邮件 POST /api/email/senEmail */
export async function senEmail(options?: { [key: string]: any }) {
  return request('/backend/api/email/senEmail', {
    method: 'POST',
    data: options
  });
}