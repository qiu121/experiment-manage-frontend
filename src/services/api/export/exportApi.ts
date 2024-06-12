import { request } from '@umijs/max';

/**
 * 导出报价确认单
 */
export async function exportConfirmQuotation(projectId: string) {
  return request('/backend/api/export/exportConfirmQuotation?projectId=' + projectId, {
    method: 'GET',
  });
}
