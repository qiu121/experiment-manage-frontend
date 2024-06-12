// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录接口 POST /login */
export async function login(options?: { [key: string]: any }) {
  return request('/backend/login', {
    method: 'POST',
    data: options,
  });
}

/** 认证登录 POST /authLogin */
export async function authLogin(options: { timestamp: string }) {
  return request('/backend/authLogin?timestamp=' + options.timestamp , {
    method: 'GET',
  });
}