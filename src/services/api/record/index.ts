import { request } from '@umijs/max';
import { method } from 'lodash';


export async function listRecord(options?: { [key: string]: any }) {
  return request('/backend/api/record/listRecord', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function listRecordByUserId(userId: any) {
  return request(`/backend/api/record/listRecordByUserId/${userId}`, {
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
    data:options,
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


export async function getRecordByUserId(userId: string | undefined) {
  return request(`/backend/api/record/getRecord/${userId}`, {
    method: 'GET',
  });
}
