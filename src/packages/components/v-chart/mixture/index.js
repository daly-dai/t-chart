/**
 * @desc 折线和柱状图
 */
import _mergeWith from 'lodash/mergeWith';
import Core from '../core.js';
import { line } from './main.js';
import { barLine } from './components/bar-line.js';

const cors = Core();

const BaseMixtureChart = _mergeWith(cors, line);

const BaseBarLineChart = _mergeWith(
  _cloneDeep(BaseMixtureChart),
  _cloneDeep(barLine)
);

export { BaseMixtureChart, BaseBarLineChart };
