import * as Icons from '@element-plus/icons-vue';
import * as AntIcons from '@ant-design/icons-vue';

export default (app: any) => {
  console.log('[Tvue] Start registering icons...');
  console.log('[Tvue] App instance:', app ? 'exists' : 'null');
  console.log('[Tvue] Ant Design Icons count:', Object.keys(AntIcons).length);

  // 注册 Element Plus 图标
  let elIconCount = 0;
  const iconsToRegister = (Icons as any).default ? (Icons as any).default : Icons;

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
  for (const key in AntIcons) {
    const componentName = transAntIconName(key);
    const iconComponent = (AntIcons as Record<string, any>)[key];

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

function transElIconName(iconName: string) {
  return 'el-icon-' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase()).replace(/^-/, '');
}

function transAntIconName(iconName: string) {
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
