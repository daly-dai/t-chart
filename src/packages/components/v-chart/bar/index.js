/**
 * @desc 柱状图
 */
import _mergeWith from 'lodash/mergeWith';
import Core from '../core.js';
import { bar } from './main.js';
import { groupBar } from './components/group-bar.js';

const cors = Core();

const BaseBarChart = _mergeWith(cors, bar);
const BaseGroupBarChart = _mergeWith(BaseBarChart, groupBar);

export { BaseBarChart, BaseGroupBarChart };
