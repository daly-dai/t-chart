/**
 * @desc 柱状图
 */
import _mergeWith from 'lodash/mergeWith';
import _cloneDeep from 'lodash/cloneDeep';
import Core from '../core.js';
import { bar } from './main.js';
import { groupBar } from './components/group-bar.js';

const cors = Core();

const BaseBarChart = _mergeWith(_cloneDeep(cors), _cloneDeep(bar));

const BaseGroupBarChart = _mergeWith(
  _cloneDeep(BaseBarChart),
  _cloneDeep(groupBar)
);

export { BaseBarChart, BaseGroupBarChart };
