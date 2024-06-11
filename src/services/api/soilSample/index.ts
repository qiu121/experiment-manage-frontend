import { request } from '@umijs/max';


export async function list(recordId: any) {
  return request(`/backend/api/soilSample/list/${recordId}`, {
    method: 'GET',
    ...(recordId || {}),
  });
}


export async function add(options?: { [key: string]: any }) {
  return request('/backend/api/soilSample/add', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function update(options?: { [key: string]: any }) {
  return request('/backend/api/soilSample/update', {
    method: 'PUT',
    ...(options || {}),
  });
}

export async function del(id: any) {
  return request(`/backend/api/soilSample/del/${id}`, {
    method: 'DELETE',
    ...(id || {}),
  });
}
/**
 * 查询用户名下的样本记录
 * @param id recordId
 * @returns count
 */

export async function count(recordId?: any) {
  return request(`/backend/api/soilSample/countByRecordId/${recordId}`, {
    method: 'GET',
    ...(recordId || {}),
  });
}





