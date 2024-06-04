// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录接口 POST /api/login/account */
export async function login(options?: { [key: string]: any }) {
  return request('/backend/login', {
    method: 'POST',
    data: options,
  });
}
