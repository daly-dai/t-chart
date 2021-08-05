/**
 * @desc
 * 自定义图标加载表
 * 所有图标均从这里加载，方便管理
 * @example
 * <template>
 *   <bx-analyse style="width: 100px;height:100px;"></bx-analyse>
 * </template>
 * <script>
 * import { bxAnalyse } from '@/plugins/icons.js';
 * export default {
 *   components: { bxAnalyse } // 已经是一个组件
 * }
 * </script>
 */
/**
 * @desc
 * 自定义图标加载表
 * 所有图标均从这里加载，方便管理
 * @example
 * <template>
 *   <bx-analyse style="width: 100px;height:100px;"></bx-analyse>
 * </template>
 * <script>
 * import { bxAnalyse } from '@/plugins/icons.js';
 * export default {
 *   components: { bxAnalyse } // 已经是一个组件
 * }
 * </script>
 */
import bxAnalyse from '@assets/icons/bx-analyse.svg?inline'; // path to your '*.svg?inline' file.
import centerInfo from '@assets/icons/center-info.svg?inline';
import studyTemplate from '@assets/icons/study-template.svg?inline';
import enterState from '@assets/icons/enter-state.svg?inline';
import sysGovernment from '@assets/icons/sys-government.svg?inline';

export { bxAnalyse, centerInfo, studyTemplate, enterState, sysGovernment };
export default [
  { name: 'bx-analyse', component: bxAnalyse },
  { name: 'center-info', component: centerInfo },
  { name: 'study-template', component: studyTemplate },
  { name: 'enter-state', component: enterState },
  { name: 'sys-government', component: sysGovernment }
];
