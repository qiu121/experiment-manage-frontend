import { request } from '@umijs/max';



export async function getAttachments(options?: any) {
  return request('/backend/api/moduleAttachment/getAttachments?' + 'type=' + options.type, {
    method: 'GET',
    requestType: 'form',
    // ...(options || {}),
  });
}