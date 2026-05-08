/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import elementComponents from './element-plus/index.mjs';
import AntDesign from './ant-design/index.mjs';
import dataComponents from './data/index.mjs';

var components = { ...AntDesign, ...elementComponents, ...dataComponents };

export { components as default };
