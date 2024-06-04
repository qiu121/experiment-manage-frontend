// https://blog.csdn.net/qq_41694291/article/details/113683149

// 用于构造枚举字段的管理者对象
// name是http传输时枚举值的字段名，根据需要可以不要
function getEnumManager (name : any, enums : any) {
  const labels = enums.map((item : any) => item.label);
  const values = enums.map((item : any) => item.value);
  return {
    name,
    labels,
    values,
    enums,
    getValueByLabel (label : any) {
      return values[labels.indexOf(label)];
    },
    getLabelByValue (value: any) {
      return labels[values.indexOf(value)];
    },
    getItemByValueOrLabel (valueOrLabel: string | number | null) {
      let index = values.indexOf(valueOrLabel);
      if (index < 0) {
        index = labels.indexOf((valueOrLabel as string));
      }
      return enums[index];
    },
    // ... // 其他专用取值函数
  }
}

export const projectStatusEnum = getEnumManager('projectStatus', [
  // { value: 0, label: '已完成', color: 'green',
  //   operation: ['checkDetail', 'download'] },
  // { value: 1, label: '待支付', color: 'orange',
  //   operation: ['pay', 'cancel'] },
  // { value: 2, label: '已取消', color: 'gray',
  //   operation: ['checkDetail'] }
  { value: 0, label: 'declaration'},
  { value: 1, label: 'approval'},
  { value: 2, label: 'conclusion'},
  { value: 3, label: 'end'},
]);


