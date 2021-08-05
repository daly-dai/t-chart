<template>
  <div :class="[$style.container, ctCls.box]">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <top-view
          :title="title"
          :subtitle="subtitle"
          :ctCls="{
            left: 'my-top-view4'
          }"
        ></top-view>
      </template>
      <template v-slot:center>
        <base-route-view
          :keep-alive="false"
          :key="$route.fullPath"
        ></base-route-view>
      </template>
    </base-border-layout>
  </div>
</template>

<script>
import { DEFAULT_SETTINGS } from '@config/index.js';
import TopView from './components/top-view.vue';

export default {
  name: 'Basic4Layout',
  components: { TopView },
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
          east: undefined
        };
      }
    }
  },
  data() {
    return {
      menus: [],
      navTitle: '',
      layout: {
        northHeight: '64px',
        westWidth: 'auto', // 设置为定值时，配合 nav-menu 导航菜单收缩菜单面板之后的宽度还是定值所以这里推荐自动
        eastWidth: '0px',
        southHeight: '0px',
        northCls: `${this.$style.northCls} ${this.ctCls.north}`,
        centerCls: `${this.$style.centerCls} ${this.ctCls.center}`,
        westCls: `${this.ctCls.west}`,
        southCls: `${this.ctCls.south}`,
        eastCls: `${this.ctCls.east}`
      }
    };
  },
  created() {
    console.info(this.$slots);
  },
  methods: {}
};
</script>
<style lang="less" module>
@import './basic-layout.less';
.container {
  .center-cls {
    > div:first-child {
      height: 100%;
      background-color: rgba(255, 255, 255);
    }
  }
}
</style>
