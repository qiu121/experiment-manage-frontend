// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/ */
export async function currentUser(options?: { [key: string]: any }) {
  return request('/backend/api/user/getInfoByReact', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/backend/loginOut', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function updateUserInfo(options?: { [key: string]: any }) {
  return request('/backend/api/user/updateUserInfo', {
    method: 'POST',
    ...(options || {}),
  });
}


export async function findUserInfo(options?: { [key: string]: any }) {
  return request('/backend/api/user/findUserInfo', {
    method: 'GET',
    ...(options || {}),
  });
}



export async function updatePwd(options?: { [key: string]: any }) {
  return request('/backend/api/user/updatePwd', {
    method: 'GET',
    ...(options || {}),
  });
}

// acount
export async function getAllUserInfo(options?: { [key: string]: any }) {
  return request('/backend/api/user/getAllUserInfo', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function register(options?: { [key: string]: any }) {
  return request('/backend/api/user/register', {
    method: 'POST',
    ...(options || {}),
  });
}


export async function delById(options?: { [key: string]: any }) {
  return request('/backend/api/user/delById', {
    method: 'POST',
    ...(options || {}),
  });
}