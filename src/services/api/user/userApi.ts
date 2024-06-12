// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前系统所有用户 POST /api/user/getAllUserInfo */
export async function getAllUserInfo(options?: { [key: string]: any }) {
  return request('/backend/api/user/getAllUserInfo', {
    method: 'POST',
    data: options
  });
}

/** 根据id获取用户信息 GET /api/user/getUserInfoByUserId */
export async function getUserInfoByUserId(options: { userId: string }) {
  return request('/backend/api/user/getUserInfoByUserId?userId=' + options.userId , {
    method: 'GET',
  });
}

/** 注册用户信息 POST /api/user/registerUser  */
export async function registerUser(options?: { [key: string]: any }) {
  return request('/backend/api/user/registerUser', {
    method: 'POST',
    data: options
  });
}

/** 修改用户信息 POST /api/user/modifyUserInfo */
export async function modifyUserInfo(options?: { [key: string]: any }) {
  return request('/backend/api/user/modifyUserInfo', {
    method: 'POST',
    data: options
  });
}

/** 修改用户信息密码 POST /api/user/resetPassWord */
export async function resetPassWord(options?: { [key: string]: any }) {
  return request('/backend/api/user/resetPassWord', {
    method: 'POST',
    data: options
  });
}

/** 根据id获取用户信息 GET /api/user/delUserInfoByUserId */
export async function delUserInfoByUserId(options: { userId: string }) {
  return request('/backend/api/user/delUserInfoByUserId?userId=' + options.userId , {
    method: 'GET',
  });
}

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
