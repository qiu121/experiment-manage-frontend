/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};

  if (currentUser === undefined) return {};

  const permissionMap = {};
  for (let item of currentUser?.permissions) {
    permissionMap[item.permissionCode] = true;
  }
  console.log(permissionMap);
  return permissionMap;
}
