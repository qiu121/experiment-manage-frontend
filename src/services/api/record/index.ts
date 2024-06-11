import { request } from '@umijs/max';


export async function listRecord(options?: { [key: string]: any }) {
  return request('/backend/api/record/listRecord', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function listRecordByUserId(userId: any) {
  return request('/backend/api/record/listRecordByUserId', {
    method: 'GET',
    ...(userId || {}),
  });
}

export async function get(options?: { [key: string]: any }) {
  return request('/backend/api/record/get', {
    method: 'GET',
    ...(options || {}),
  });
}


export async function add(options?: { [key: string]: any }) {
  return request('/backend/api/record/add', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function update(options?: { [key: string]: any }) {
  return request('/backend/api/record/update', {
    method: 'PUT',
    ...(options || {}),
  });
}


export async function del(id?: any) {
  return request(`/backend/api/record/del/${id}`, {
    method: 'DELETE',
    ...(id || {}),
  });
}


