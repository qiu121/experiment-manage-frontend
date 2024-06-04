
export default {

  EMPTY_STRING: '',
  NULL: null,
  
  //
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,

  // mode
  ADD: 'add',
  UPDATE: 'update',
  DELETE: 'delete',

  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',

  SLASH: '/',
  BACKSLASH: "\\",

  ADDSUCCESS: '添加成功',
  ADDFAILED: '添加失败, 请联系管理员',

  UPDATESUCCESS: '更新成功',
  UPDATEFAILED: '更新失败, 请联系管理员',

  DELETESUCCESS: '删除成功',
  DELETEMESSAGEA: '请先删除其子项',
  DELETEFAILED: '删除失败, 请联系管理员',

  GETERROR: '获取数据异常,请联系管理员',

  // dataGrid page
  PERPAGEROW: '每页行数',
  PERPAGE: 5,
  PAGELIST: [5, 10, 20],
  PAGEPROMPT: (from :any, to :any, count : any) => `第${from} 条到第 ${to} 条, 共 ${count} 条`,

  // dialog
  DIALOGWIDTH: '400px',
  DELETECONFIRMTITLE: '确定删除？',
  DELETECONFIRDESCRIPTION: '此操作将永久删除选中资源',

  // notification
  DECLARATIONMESSAGE: '已有专家填写申报信息，请查看',
  APPROVALMESSAGE: '项目立项，管理员已审核完成项目申报',
  CONCLUSIONMESSAGE: '进入结项阶段',
  ENDMESSAGE: '项目结束',
  

  // status
  

}

