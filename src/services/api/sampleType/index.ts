import {request} from '@umijs/max';


export async function list(options?: { [key: string]: any }) {
  return request('/backend/api/sampleType/list', {
    method: 'GET',
    ...(options || {}),
  });
}


export async function add(options?: { [key: string]: any }) {
  return request('/backend/api/sampleType/add', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function update(options?: { [key: string]: any }) {
  return request('/backend/api/sampleType/update', {
    method: 'PUT',
    ...(options || {}),
  });
}


export async function del(id?: { [key: string]: any }) {
  return request('/backend/api/sampleType/del/' + id, {
    method: 'DELETE',
    ...(id || {}),
  });
}



