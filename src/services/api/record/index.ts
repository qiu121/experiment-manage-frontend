import {request} from '@umijs/max';


export async function get(options?: { [key: string]: any }) {
  return request('/backend/api/conference/get', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getOwn(options?: { [key: string]: any }) {
  return request('/backend/api/reward/getOwn', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getById(options?: { [key: string]: any }) {
  return request('/backend/api/conference/getById' + '?ids=' + options, {
    method: 'GET',
    ...(options || {}),
  });
}

// export async function getByUserId(options?: { [key: string]: any }) {
//   return request('/backend/api/reward/getByUserId', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }

export async function add(options?: { [key: string]: any }) {
  return request('/backend/api/conference/add', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function update(options?: { [key: string]: any }) {
  return request('/backend/api/conference/update', {
    method: 'PUT',
    ...(options || {}),
  });
}


export async function del(id?: { [key: string]: any }) {
  return request('/backend/api/conference/del/' + id, {
    method: 'DELETE',
    ...(id || {}),
  });
}


export async function delAttachment(options?: { [key: string]: any }) {
  return request('/backend/api/conference/delAttachment', {
    method: 'POST',
    ...(options || {}),
  });
}


export async function upload(options?: { [key: string]: any }) {
  return request('/backend/api/conference/upload', {
    method: 'POST',
    requestType: 'form',
    ...(options || {}),
  });
}


// export async function exportLog(options?: { [key: string]: any }) {
//   return request('/backend/api/reward/exportLog?' + 'searchName=1&type=1', {
//     method: 'GET',
//     requestType: 'form',
//     ...(options || {}),
//   });
// }


