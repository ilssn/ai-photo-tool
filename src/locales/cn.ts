
const cn = {
  Symbol: "cn",
  Title: '302.AI',
  System: {
    Title: '系统',
    Wait: '等待',
    Back: '返回',
    Download: '下载',
  },
  Error: {
    Title: '错误',
    TokenMiss: '该工具已禁用/删除！', // -10001
    TokenInvalid: '该工具已禁用/删除！', // -10002
    InternalError: '内部错误，请联系客服！', // -10003
    AccountOut: '账号欠费，请充值后重试!', // -10004
    TokenExpired: '令牌过期，请刷新页面后重试！', // -10005
    TotalOut: '工具总额度已用完，请联系管理员充值！', // -10006
    TodayOut: '工具当日额度已用完，请联系管理员充值！', // -10007
    HourOut: '该工具在本小时的额度已达上限!', // -10012
    ErrorPrompt: '视频提示词违规，请重新输入！', // -10011
  },
  Auth: {
    Title: '授权',
    NeedCode: '需要分享码',
    InputCode: '创建者开启了验证，请在下方填入分享码',
    PlaceHodeer: '请输入分享码数',
    ToolBin: '工具已禁用, 更多信息请访问',
    ToolDel: '工具已删除, 更多信息请访问',
    Submit: '确认',
    Remind: '记住分享码',
    CodeError: '验证码错误！',
    AccountBin: '账号已被禁用!',
    AccountDel: '账号已被注销！',
    NetworkError: '网络错误，请刷新页面后重试！',
  },
  Home: {
    Title: '主页',
  },
  About: {
    Title: '关于',
  },
  History: {
    Title: '历史记录',
    Empty: '抱歉, 暂无历史记录!',
    Error: '数据格式错误！',
    RollbackSuccess: '记录回滚成功!',
    RollbackFaild: '记录回滚失败，数据异常!',
    ClearSuccess: '历史记录已全部删除！',
    RecordType: '记录类型',
    ClearAll: '清空历史记录',
    ClearAllSure: '确定清空所有历史记录吗？',
    Clear: '清空',
    NotNow: '暂不',
    ItemCount: (count: number) => `共${count}条历史记录`,

  },
  Photo: {
    Landing: {
    },
    Edit: {
    },
    Tool: {
      title: '现已支持',
      action: '试一试',
      list: [
        {
          id: 1,
          name: 'remove-bg',
          icon: '/icons/rm-bg.svg',
          title: '去除背景',
          desc: '精确提取图片中主体',
        },
        {
          id: 2,
          name: 'remove-obj',
          icon: 'remove-obj',
          title: '物体消除',
          desc: '擦掉您想要移除的区域',
        },
        {
          id: 3,
          name: 'replace-bg',
          icon: 'replace-bg',
          title: '背景替换',
          desc: '以当前图片为基础，生成一张新的图片',
        },
        {
          id: 4,
          name: 'vector',
          icon: 'vector',
          title: '图片矢量化',
          desc: '将图片转化为可无限放大的矢量图',
        },
        {
          id: 5,
          name: 'upscale',
          icon: 'upscale',
          title: '图片放大',
          desc: '支持2x，4x，8x放大图片',
        },
        {
          id: 6,
          name: 'super-upscale',
          icon: 'super-upscale',
          title: '超级图片放大',
          desc: '对图片进行AI生成，添加原图没有的细节',
        },
        {
          id: 7,
          name: 'colorize',
          icon: 'colorize',
          title: '黑白上色',
          desc: '对黑白照片进行上色',
        },
        {
          id: 8,
          name: 'replace-face',
          icon: 'replace-face',
          title: 'AI换脸',
          desc: '更换图片人物的脸',
        },
        {
          id: 9,
          name: 'uncrop',
          icon: 'uncrop',
          title: '图片拓展',
          desc: '将图片的边界进行拓展',
        },
        {
          id: 10,
          name: 'modify',
          icon: 'modify',
          title: '图片修改',
          desc: '将图片的内容进行AI修改',
        },
        {
          id: 11,
          name: 'by-img',
          icon: 'by-img',
          title: '以图生图',
          desc: '以当前图片为基础，生成一张新的图片',
        },
        {
          id: 12,
          name: 'by-sketch',
          icon: 'by-sketch',
          title: '草稿生图',
          desc: '将一张手稿生成一个精美的图片',
        },
      ]
    }
  }
};

type DeepPartial<T> = T extends object
  ? {
    [P in keyof T]?: DeepPartial<T[P]>;
  }
  : T;

export type LocaleType = typeof cn;
export type PartialLocaleType = DeepPartial<typeof cn>;

export default cn;
