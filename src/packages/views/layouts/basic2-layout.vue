<template>
  <div :class="[$style.container, ctCls.box]">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <top-view2
          ref="topView2"
          :title="title"
          :subtitle="subtitle"
          :renderDropColumnDown="renderDropColumnDown"
          :renderDropDown="renderDropDown"
          :renderLoginOut="renderLoginOut"
          :ctCls="{
            left: 'my-top-view2'
          }"
          v-if="renderTopView"
        ></top-view2>
      </template>
      <template v-slot:west>
        <base-nav-menu
          ref="menu"
          :menus="menus"
          v-bind="menuProps"
          :navTitle="navTitle"
          @select="handleSelect"
          :svgIcons="svgIcons"
        >
        </base-nav-menu>
      </template>
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
import svgIcons from '@/plugins/icons.js';
import { DEFAULT_SETTINGS } from '@config/index.js';
import _last from 'lodash/last';
import _split from 'lodash/split';
import _isEmpty from 'lodash/isEmpty';
import _drop from 'lodash/drop';
import _concat from 'lodash/concat';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _cloneDeep from 'lodash/cloneDeep';
import TopView2 from './components/top-view2.vue';

export default {
  name: 'Basic2Layout',
  provide: function() {
    return {
      getBase2Layout: this
    };
  },
  components: { TopView2 },
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
    // 渲染 base-nav-menu 菜单组件
    renderNavMenu: {
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
      svgIcons: svgIcons,
      layout: {
        northHeight: this.renderTopView ? '64px' : '0px',
        westWidth: this.renderNavMenu ? 'auto' : '0px', // 设置为定值时，配合 nav-menu 导航菜单收缩菜单面板之后的宽度还是定值所以这里推荐自动
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
      navTitle: '示例平台',
      menus: [],
      menuProps: {
        collapsed: DEFAULT_SETTINGS.collapsed, // 侧栏收起状态
        defaultActive: '',
        textColor: '#BFCBD9',
        activeTextColor: '#409EFF',
        navIcon: 'el-icon-menu',
        backgroundColor: '#304156',
        collapseText: '收起导航',
        collapsePosition: 'bottom'
      },
      breadCrumbOptions: [],
      buttonGroup: []
    };
  },
  created() {
    // setTimeout(() => {
    // this.menuProps.collapsed = false;
    // }, 3000);
  },
  methods: {
    /**
     * @desc 设置 menus
     */
    setMenus(menus) {
      this.menus = menus;
    },
    /**
     * @desc 获取 menus
     */
    getMenus() {
      return this.menus;
    },
    /**
     * @desc 菜单激活回调
     */
    handleSelect(key, keyPath) {
      // this.checkedFirstMenu2BlockIndex = this.$refs.topView2.buttonGroupOption.defaultActive;
      this.$refs.topView2.setCheckedFirstMenu2BlockIndex(
        this.$refs.topView2.buttonGroupOption.defaultActive
      );
      const aKeyPathList = _drop(_split(_last(keyPath), '-'), 1);
      let menu = null;
      const menuList = [];
      for (let i = 0, len = aKeyPathList.length; i < len; i++) {
        if (i === 0) {
          menu = this.menus[aKeyPathList[i]];
        } else {
          menu = menu.children[aKeyPathList[i]];
        }
        menu && menuList.push(menu);
      }
      if (
        this.$route.name !== menu.menuCode &&
        !_isEmpty(menu) &&
        menu.menuCode !== ''
      ) {
        this.menuProps.defaultActive = key; // 设置选中的菜单
        this.breadCrumbOptions = _concat(
          { text: _get(this.$refs.topView2.checkedFirstMenu, 'menuName', '') },
          _map(menuList, menu => ({ text: menu.menuName }))
        ); // 设置面包屑
        // 外部链接
        if (_has(menu, 'target') && menu.target === 'out') {
          const currentRoute = this.$router.resolve({ name: menu.menuCode });
          const target = _get(currentRoute, 'route.meta.target', '_blank');
          if (_includes(menu.menuCode, 'http')) {
            window.open(menu.menuCode, target);
          } else {
            const fullPath = _get(currentRoute, 'route.fullPath', '');
            if (fullPath.length > 0) {
              const routeData = this.$router.resolve({
                path: fullPath
              });
              window.open(routeData.href, target);
            }
          }
        } else {
          this.$router.push({ name: menu.menuCode });
        }
      } else {
        // 调用路由对应页面的 routerActivated 方法
        const { matched } = this.$router.currentRoute;
        if (
          !_isEmpty(matched) &&
          !_isNil(
            matched[matched.length - 1].instances.default.$options
              .routerActivated
          )
        ) {
          const that = matched[matched.length - 1].instances.default;
          that.$options.routerActivated.call(that);
        }
      }
    },
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
}
// .button-group-cls {
//   // padding: 0px 34px;
//   padding-left: 35px !important;
//   & :hover {
//     color: #4989f4;
//   }
// }
</style>
