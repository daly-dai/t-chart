/**
 * @desc 公共的一些字典
 */
export default {
  SEX_TYPE: [
    { paramValue: 0, paramDesc: '女' },
    { paramValue: 1, paramDesc: '男' }
  ],
  FLAG_TYPE: [
    { paramValue: 1, paramDesc: '新增' },
    { paramValue: 10, paramDesc: '等待' },
    { paramValue: 128, paramDesc: '归档' },
    { paramValue: 256, paramDesc: '停用' },
    { paramValue: 384, paramDesc: '丢弃' }
  ],
  WF_TYPE: [
    { paramValue: 0, paramDesc: '退回' },
    { paramValue: 1, paramDesc: '提交' },
    { paramValue: 2, paramDesc: '转交' }
  ],
  BOOLEAN_NUMBER_TYPE: [
    { paramValue: 0, paramDesc: '否' },
    { paramValue: 1, paramDesc: '是' }
  ],
  BOOLEAN_BOOLEAN_TYPE: [
    { paramValue: false, paramDesc: '否' },
    { paramValue: true, paramDesc: '是' }
  ],
  // 模块权限
  ACCESS_TYPE: [
    { paramValue: 0, paramDesc: 'default' }, // 可分配
    { paramValue: 1, paramDesc: 'read' }, // 只读
    { paramValue: 2, paramDesc: 'write' }, // 可写
    { paramValue: 3, paramDesc: 'write' } // 可写
  ],
  // 需求单状态
  NODE_STATUS: [
    { paramValue: 0, paramDesc: '待授信' },
    { paramValue: 1, paramDesc: '待担保' },
    { paramValue: 2, paramDesc: '不予担保' },
    { paramValue: 3, paramDesc: '不予授信' },
    { paramValue: 4, paramDesc: '授信成功' },
    { paramValue: 5, paramDesc: '需求关闭' },
    { paramValue: 6, paramDesc: '需求撤回' }
  ],
  // 嵌套 grid 状态字段
  STATE_NESTING_GRID: [
    { paramValue: 1, paramDesc: '待分配' },
    { paramValue: 2, paramDesc: '待受理' },
    { paramValue: 3, paramDesc: '处理中' },
    { paramValue: 4, paramDesc: '已办结' }
  ]
};
