<template>
  <div :class="[$style.container, 'basic3-layout', ctCls.box]">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <top-view3
          ref="topView3"
          :title="title"
          :subtitle="subtitle"
          :renderDropColumnDown="renderDropColumnDown"
          :renderDropDown="renderDropDown"
          :renderLoginOut="renderLoginOut"
          :ctCls="{
            left: 'my-top-view3'
          }"
          v-if="renderTopView"
        ></top-view3>
      </template>
      <template v-slot:west> </template>
      <template v-slot:center>
        <base-border-layout :class="$style.bgFff" v-bind="innerLayout">
          <template v-slot:north>
            <div class="mt-8">
              <base-bread-crumb
                separator-class="el-icon-arrow-right"
                :options="breadCrumbOptions"
                @bread-click="onBreadClick"
              ></base-bread-crumb>
            </div>
          </template>
          <template v-slot:center>
            <div :class="[$style.fullY, $style.bgFff]">
              <base-route-view
                :keep-alive="false"
                :key="$route.fullPath"
              ></base-route-view>
            </div>
          </template>
        </base-border-layout>
      </template>
    </base-border-layout>
  </div>
</template>

<script>
import { DEFAULT_SETTINGS } from '@config/index.js';
import _cloneDeep from 'lodash/cloneDeep';
import TopView3 from './components/top-view3.vue';

export default {
  name: 'Basic3Layout',
  provide: function() {
    return {
      getBase3Layout: this
    };
  },
  components: { TopView3 },
  props: {
    // 顶部栏目标题文字-副标题
    title: {
      type: String,
      default: DEFAULT_SETTINGS.title
    },
    // 主标题
    subtitle: {
      type: String,
      default: DEFAULT_SETTINGS.subtitle
    },
    // 渲染 top-view.vue
    renderTopView: {
      type: Boolean,
      default: true
    },
    // 是否渲染 当前应用 下拉面板
    renderDropColumnDown: {
      type: Boolean,
      default: true
    },
    // 是否渲染 消息 图标和下拉面板
    renderDropDown: {
      type: Boolean,
      default: true
    },
    // 是否渲染 登出 图标
    renderLoginOut: {
      type: Boolean,
      default: true
    },
    // 自定义样式
    ctCls: {
      type: Object,
      default() {
        return {
          box: undefined,
          north: undefined,
          west: undefined,
          center: undefined,
          south: undefined,
          east: undefined,
          inner: {
            north: undefined,
            west: undefined,
            center: undefined,
            south: undefined,
            east: undefined
          }
        };
      }
    }
  },
  data() {
    return {
      layout: {
        northHeight: this.renderTopView ? '60px' : '0px',
        westWidth: 'auto',
        eastWidth: '0px',
        southHeight: '0px',
        northCls: `${this.$style.northCls} ${this.ctCls.north}`,
        westCls: `${this.ctCls.west}`,
        eastCls: `${this.ctCls.east}`,
        southCls: `${this.ctCls.south}`,
        centerCls: `${this.ctCls.center}`
      },
      innerLayout: {
        northHeight: '30px',
        westWidth: '0px',
        eastWidth: '0px',
        southHeight: '0px',
        northCls: `${this.$style.borderBottom} ${this.ctCls.inner.north}`,
        westCls: `${this.ctCls.inner.west}`,
        eastCls: `${this.ctCls.inner.east}`,
        southCls: `${this.ctCls.inner.south}`,
        centerCls: `${this.ctCls.inner.center}`
      },
      breadCrumbOptions: []
    };
  },
  created() {
    // setTimeout(() => {
    // this.layout.westWidth = '64px';
    // this.menuProps.collapsed = false;
    // }, 3000);
  },
  methods: {
    /**
     * @desc 设置面包屑
     * @param {string[]} options - 面包屑参数
     * this.getBaseLayout().appendBreadCrumbOptions([{text: 'hello'},{text: 'world'}])
     */
    setBreadCrumbOptions(options = []) {
      if (_isArray(options)) {
        this.breadCrumbOptions = options;
      }
    },
    /**
     * @desc 追加面包屑
     * @param {string[]} options - 面包屑参数
     * @example
     * this.getBaseLayout().appendBreadCrumbOptions([{text: 'hello'},{text: 'world'}])
     */
    appendBreadCrumbOptions(options = []) {
      if (_isArray(options)) {
        this.breadCrumbOptions = _concat(this.breadCrumbOptions, options);
      }
    },
    /**
     * @desc 删除面包屑
     * @example
     * @param {array[]} name - 面包屑名字
     * this.getBaseLayout().removeBreadCrumbOptions()
     */
    removeBreadCrumbOptions(name = []) {
      const breadCrumbOptions = [];
      if (name && this.breadCrumbOptions.length > 0) {
        // _drop(this.breadCrumbOptions, this.breadCrumbOptions.length);
        for (const item of this.breadCrumbOptions) {
          if (!name.includes(item.text)) {
            breadCrumbOptions.push(item);
          }
        }
      }
      this.breadCrumbOptions = _cloneDeep(breadCrumbOptions);
    },
    /**
     * @desc 面包屑点击事件
     * @event
     */
    onBreadClick(option, event) {
      const { matched } = this.$router.currentRoute;
      if (
        !_isEmpty(matched) &&
        !_isNil(matched[matched.length - 1].instances.default)
      ) {
        const that = matched[matched.length - 1].instances.default;
        _has(that, 'breadClickEvent') && that.breadClickEvent(option);
      }
    }
  }
};
</script>
<style lang="less" module>
@import './basic-layout.less';
.container {
  /* 修改组件样式 同 deep、<<< */
  :global .el-menu.el-menu--horizontal {
    border-bottom: 0;
  }
}
</style>
