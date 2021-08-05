/**
 * @desc 饼图
 */
import _mergeWith from 'lodash/mergeWith';
import Core from '../core.js';
import pie from './main.js';

const cors = Core();

const BasePieChart = _mergeWith(cors, pie);

export { BasePieChart };
