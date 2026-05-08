/*! Tvue.js v0.0.19 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import * as Icons from '@element-plus/icons-vue';
import * as index from '../node_modules/.pnpm/@ant-design_icons-vue@7.0.1_vue@3.5.33_typescript@5.9.3_/node_modules/@ant-design/icons-vue/es/index.mjs';

var createIcon = (app) => {
    console.log('[Tvue] Start registering icons...');
    console.log('[Tvue] App instance:', app ? 'exists' : 'null');
    console.log('[Tvue] Ant Design Icons count:', Object.keys(index).length);
    // 注册 Element Plus 图标
    let elIconCount = 0;
    const iconsToRegister = Icons.default ? Icons.default : Icons;
    for (const key in iconsToRegister) {
        const componentName = transElIconName(key);
        const iconComponent = iconsToRegister[key];
        if (iconComponent && typeof iconComponent !== 'undefined') {
            app.component(componentName, iconComponent);
            elIconCount++;
        }
    }
    console.log('[Tvue] Registered Element Plus Icons:', elIconCount);
    // 注册 Ant Design 图标
    let antIconCount = 0;
    for (const key in index) {
        const componentName = transAntIconName(key);
        const iconComponent = index[key];
        if (iconComponent) {
            app.component(componentName, iconComponent);
            antIconCount++;
        }
    }
    console.log('[Tvue] Registered Ant Design Icons:', antIconCount);
    // 验证注册是否成功
    const testComponent = app.component('ant-icon-appstore-outlined');
    console.log('[Tvue] Verification - ant-icon-appstore-outlined:', testComponent ? 'REGISTERED ✓' : 'NOT FOUND ✗');
    console.log('[Tvue] Icon registration completed.');
};
function transElIconName(iconName) {
    return 'el-icon-' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase()).replace(/^-/, '');
}
function transAntIconName(iconName) {
    const suffixes = ['Outlined', 'Filled', 'TwoTone'];
    let prefix = iconName;
    let suffix = '';
    for (const suffixName of suffixes) {
        if (iconName.endsWith(suffixName)) {
            suffix = suffixName;
            prefix = iconName.slice(0, -suffixName.length);
            break;
        }
    }
    const convertedPrefix = prefix.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase()).replace(/^-/, '');
    return 'ant-icon-' + convertedPrefix + (suffix ? '-' + suffix.toLowerCase() : '');
}

export { createIcon as default };
