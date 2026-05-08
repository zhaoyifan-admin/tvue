// 创建文件: /Users/zhaoyifan/Desktop/zhaoyifan/tvue/src/utils/icon.ts
import * as AntIcons from '@ant-design/icons-vue';

/**
 * 将短横线命名转换为驼峰命名
 * @example kebabToPascal('plus-circle') => 'PlusCircle'
 */
export function kebabToPascal(str: string): string {
  if (!str) return '';
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * 智能获取 Ant Design 图标组件
 * @param iconName 图标名称，支持多种格式：
 *   - 完整组件名: 'AppstoreOutlined', 'SearchFilled'
 *   - 短横线命名: 'appstore', 'plus-circle'
 *   - 简单单词: 'search', 'edit'
 * @param defaultIcon 默认图标名称（当 iconName 为空时使用）
 * @returns 图标组件对象，如果找不到返回 null
 *
 * @example
 * getAntIcon('appstore') // => AppstoreOutlined 组件
 * getAntIcon('plus-circle') // => PlusCircleOutlined 组件
 * getAntIcon('AppstoreOutlined') // => AppstoreOutlined 组件
 * getAntIcon('', 'search') // => SearchOutlined 组件
 */
export function getAntIcon(iconName?: string | null, defaultIcon?: string) {
  // 获取实际的图标名称
  let name = iconName;
  if (!name && defaultIcon) {
    name = defaultIcon;
  }

  if (!name) return null;

  let componentName = name;

  // 情况1: 如果已经是完整的组件名（如 AppstoreOutlined）
  if (name.endsWith('Outlined') || name.endsWith('Filled') || name.endsWith('TwoTone')) {
    componentName = name;
  }
  // 情况2: 如果是短横线命名（如 appstore、plus-circle）
  else if (name.includes('-')) {
    componentName = kebabToPascal(name) + 'Outlined';
  }
  // 情况3: 如果是简单的单词（如 search）
  else {
    componentName = name.charAt(0).toUpperCase() + name.slice(1) + 'Outlined';
  }

  const iconComponent = (AntIcons as any)[componentName];

  if (!iconComponent) {
    console.warn(`[getAntIcon] Icon not found: ${componentName}`);
  }

  return iconComponent || null;
}
