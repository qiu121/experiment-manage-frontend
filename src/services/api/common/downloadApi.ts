import { request } from '@umijs/max';

/**
 * 下载报价确认单
 */
export async function downloadTemporary(fileName: string) {
  return request('/backend/api/download/downloadTemporary?fileName=' + fileName, {
    responseType: 'blob',
    method: 'GET',
  });
}
