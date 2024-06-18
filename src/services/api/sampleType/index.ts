import {request} from '@umijs/max';


export async function list(page: { [key: string]: any } = {}) {
  return request('/backend/api/sampleType/list', {
    method: 'POST',
    data:page
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


export async function del(id?:any) {
  return request(`/backend/api/sampleType/del/${id}`, {
    method: 'DELETE',
    ...(id || {}),
  });
}



