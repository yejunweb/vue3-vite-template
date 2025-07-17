'use strict';

module.exports = {
    types: [
        // https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html
        // http://www.taoweng.site/index.php/archives/20210905/
        { value: 'feat', name: '✨  feat:           一个新特性' },
        { value: 'fix', name: '🐛  fix:            修复Bug' },
        { value: 'docs', name: '📚  docs:           变更文档' },
        { value: 'test', name: '🏁  test:           修改或添加测试文件' },
        { value: 'perf', name: '📈  perf:           性能提升' },
        { value: 'chore', name: '🗯  chore:          杂务，不属于以上类型，例如run build、引入或更新软件包等' },
    ],

    // scopes: [{ name: 'accounts' }, { name: 'admin' }, { name: 'exampleScope' }, { name: 'changeMe' }],

    // allowTicketNumber: false,
    // isTicketNumberRequired: false,
    // ticketNumberPrefix: 'TICKET-',
    // ticketNumberRegExp: '\\d{1,5}',

    messages: {
        type: '选择一种你的提交类型:',
        scope: '选择修改涉及范围 (可选):',
        // used if allowCustomScopes is true
        customScope: '请输入本次改动的范围（如：功能、模块等）:',
        subject: '简短说明:\n',
        body: '详细说明，使用"|"分隔开可以换行(可选)：\n',
        breaking: '非兼容性，破坏性变化说明 (可选):\n',
        footer: '关联关闭的issue，例如：#31, #34(可选):\n',
        confirmCommit: '确定提交说明?',
    },

    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'], // 仅在feat、fix时填写破坏性更改
    subjectLimit: 100, // limit subject length
    breaklineChar: '|', // 设置body和footer中的换行符
};
