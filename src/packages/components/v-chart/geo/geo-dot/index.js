import _mergeWith from 'lodash/mergeWith';
import { geo } from '../geo-core.js';

import visualMap from './main.js';

const BaseGeoDotChart = _mergeWith(visualMap, geo);

export { BaseGeoDotChart };
