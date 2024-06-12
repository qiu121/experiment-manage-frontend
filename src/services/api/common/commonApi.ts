import { request } from '@umijs/max';

/** 删除文件 GET /api/fileInfo/delFileInfoById */
export async function delFileInfoById(fileId: string) {
  return request('/backend/api/fileInfo/delFileInfoById?fileId=' + fileId, {
    method: 'GET',
  });
}

/** 获取文件列表 GET /api/fileInfo/getAllFileInfoByCommonId */
export async function getAllFileInfoByCommonId(commonId: string) {
  return request('/backend/api/fileInfo/getAllFileInfoByCommonId?commonId=' + commonId, {
    method: 'GET',
  });
}
