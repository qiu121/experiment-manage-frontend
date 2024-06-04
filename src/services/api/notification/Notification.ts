import { request } from '@umijs/max';



export async function get(options?: { [key: string]: any }) {
  return request('/backend/api/notification/get', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getOwn(options?: { [key: string]: any }) {
  return request('/backend/api/notification/getOwn', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getById(options?: { [key: string]: any }) {
  return request('/backend/api/notification/getById' + '?ids=' + options, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getByUserId(options?: { [key: string]: any }) {
  return request('/backend/api/notification/getByUserId', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function add(options?: { [key: string]: any }) {
  return request('/backend/api/notification/add', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function update(options?: { [key: string]: any }) {
  return request('/backend/api/notification/update', {
    method: 'POST',
    ...(options || {}),
  });
}