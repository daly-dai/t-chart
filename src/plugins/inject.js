/**
 * @desc 需要挂载(注入)到根实例的都放在这里
 */
import LoaderApiLibrary from '@plugins/axios/api.js';
import axios from 'axios';
import DataDictFilter from '@plugins/data-dict-filter/index.js';
import vBus from '@plugins/v-bus.js';
import log from '@/plugins/log.js'; // 彩色 log
import ApiConfig from '../service/api/index.js';
import { USER_API_CONFIG, USER_AXIOS_CONFIG } from '../config/index.js';
import {
  apiRequestStartHandler,
  apiRequestEndHandler,
  apiRequestInterceptErrorHandler
} from '../config/interceptor/api.js';
import moduleConst from './constant.js';
import ApiFilterExpand from './axios/filter.js';

export default {
  install: (Vue, options = {}) => {
    const Loader = new LoaderApiLibrary(
      ApiConfig,
      USER_API_CONFIG,
      USER_AXIOS_CONFIG,
      ApiFilterExpand // 设置自定义扩展拦截器类
    );
    window.apiRequestStartHandler = apiRequestStartHandler;
    window.apiRequestEndHandler = apiRequestEndHandler;
    window.apiRequestInterceptErrorHandler = apiRequestInterceptErrorHandler;

    Object.defineProperty(Vue.prototype, '$loaderApiLibrary', {
      value: Loader
    });
    Object.defineProperty(Vue.prototype, '$api', { value: Loader.api });
    Object.defineProperty(Vue.prototype, '$axios', { value: axios });
    Object.defineProperty(Vue.prototype, '$dict', {
      value: new DataDictFilter({ label: 'name', code: 'id' })
    });
    Object.defineProperty(Vue.prototype, '$vBus', { value: vBus });
    Object.defineProperty(Vue.prototype, '$constant', { value: moduleConst });
    Object.defineProperty(window, '$log', { value: log });
  }
};
