/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } : any = initialState ?? {};

  if (currentUser === undefined) return {};

  const permissionMap : any = {};
  for (let item of currentUser?.permissions) {
      permissionMap[item?.permissionCode] = true;
  }

  return permissionMap;
}
