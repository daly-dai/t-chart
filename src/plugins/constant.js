/**
 * 服务层 const 插件
 * this.$const['USER/GRADE']['value']
 */
import { CONST_DEFAULT_CONFIG } from '../config/index.js';
import CONST_CONFIG from '../service/constant/index.js';

class MakeConst {
  constructor(options) {
    this.const = {};
    this.constBuilder(options);
  }

  constBuilder({ sep = '/', config = [] } = {}) {
    Object.keys(config).map(namespace => {
      // console.info(namespace, config[namespace]);
      this._createConstSingle({
        namespace,
        sep,
        config: config[namespace]
      });
    });
  }

  _createConstSingle({ namespace, sep = '/', config = {} }) {
    Object.defineProperty(this.const, `${namespace}`, { value: config });
  }
}

export default new MakeConst({
  ...CONST_DEFAULT_CONFIG,
  config: CONST_CONFIG
}).const;
