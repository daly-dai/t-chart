<template>
  <base-double-wing>
    <template v-slot:left>
      <div
        :class="[
          $style.fullY,
          $style.logoBox,
          $style.flexCenter,
          $style.pointer,
          ctCls.left
        ]"
        @click="titleClick"
      >
        <img :src="iconfontUrl()" alt="" />
        <div v-if="subtitle.length > 0">
          <span>{{ subtitle }}</span>
          <span>{{ title }}</span>
        </div>
        <div v-else>
          {{ title }}
        </div>
      </div>
    </template>
    <template v-slot:middle>
      <base-nav-menu
        ref="menu"
        mode="horizontal"
        :menus="getMenus"
        v-bind="menuProps"
        @select="handleSelect"
        :svgIcons="svgIcons"
      >
      </base-nav-menu>
    </template>
    <template v-slot:right>
      <div :class="[$style.fullY, $style.rightBox, $style.flexCenter]">
        <div>
          <base-drop-column-down
            size="mini"
            title="当前应用名称"
            :options="dropColumnDownOptions"
            trigger="hover"
            :hide-on-click="true"
            @click="onDropColumnDownClick"
            v-if="renderDropColumnDown"
          ></base-drop-column-down>
        </div>
        <div @click="onClickFullScreen" title="全屏" :class="$style.pointer">
          <i :class="isFullscreen ? 'el-icon-plus' : 'el-icon-full-screen'"></i>
        </div>
        <div>
          <base-drop-down
            size="mini"
            :title="getUserData.userName"
            :options="options"
            v-if="renderDropDown"
          ></base-drop-down>
        </div>
        <div v-if="renderLoginOut" :class="$style.logout" @click="onLoginout">
          <i class="el-icon-switch-button"></i>
        </div>
      </div>
    </template>
  </base-double-wing>
</template>

<script>
import {
  ROOT_PAGE_NAME,
  DEFAULT_SETTINGS,
  LOGIN_PAGE_NAME
} from '@config/index.js';
import svgIcons from '@/plugins/icons.js';
import screenfull from 'screenfull';
import { mapActions, mapGetters } from 'vuex';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';
import _findIndex from 'lodash/findIndex';
import _join from 'lodash/join';
import _last from 'lodash/last';
import _split from 'lodash/split';

export default {
  name: 'TopView3',
  inject: ['getBase3Layout'],
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
          left: undefined
        };
      }
    }
  },
  computed: {
    ...mapGetters(['getUserData']), //, 'getMenus'
    getMenus() {
      if (this.ROOT_PAGE_NAME !== ROOT_PAGE_NAME) {
        const menus = _find(
          this.$store.getters.getMenus,
          menu => menu.menuCode === this.ROOT_PAGE_NAME
        );
        if (_isNil(menus)) {
          return [];
        }
        return _get(menus, 'children', []);
      }
      return this.$store.getters.getMenus;
    }
  },
  watch: {
    // 监听路由改变-路由动态改变
    $route: {
      handler(to, from) {
        if (!_isEmpty(to.matched)) {
          const rootPageName = to.matched[0].name; // 匹配到的路由路径列表，第一个是匹配到的根路由
          if (rootPageName !== this.ROOT_PAGE_NAME) {
            this.ROOT_PAGE_NAME = rootPageName;
          }
          this.setCheckedMenu(to, from);
        }
      },
      immediate: true
    }
  },
  data() {
    this.ROOT_PAGE_NAME = ROOT_PAGE_NAME; // 根路由名称
    return {
      svgIcons: svgIcons,
      iconfontUrl: DEFAULT_SETTINGS.iconfontUrl,
      titleClick: DEFAULT_SETTINGS.titleClick.bind(this),
      logoutLoading: false,
      isFullscreen: false,
      menuProps: {
        collapsed: DEFAULT_SETTINGS.collapsed, // 侧栏收起状态
        defaultActive: '',
        textColor: '#E0E939',
        activeTextColor: '#333',
        backgroundColor: '#fff',
        collapseText: '收起导航'
      },
      options: [
        { text: '个人中心', icon: 'el-icon-user' },
        { text: '消息中心', icon: 'el-icon-bell' },
        {
          text: '登出',
          icon: 'el-icon-close',
          listeners: { click: this.onLoginout },
          divided: true
        }
      ],
      dropColumnDownOptions: [
        [
          {
            title: '企业关联图谱',
            list: [
              {
                id: '1',
                icon: 'el-icon-platform-eleme',
                label: '血缘关系图谱'
              },
              { id: '2', icon: 'el-icon-delete-solid', label: '事件关系图谱' },
              { id: '3', icon: 'el-icon-s-tools', label: '供应-销售链树' },
              { id: '4', icon: 'el-icon-phone', label: '产业链树' }
            ]
          },
          {
            title: '企业高质量评价',
            list: [
              { id: '5', icon: 'el-icon-star-on', label: '评价任务' },
              { id: '6', icon: 'el-icon-s-goods', label: '业务指导' },
              { id: '7', icon: 'el-icon-warning', label: '进度管控' },
              { id: '8', icon: 'el-icon-error', label: '企业评价' },
              { id: '9', icon: 'el-icon-question', label: '评价结果' },
              { id: '10', icon: 'el-icon-remove', label: '决策分析' }
            ]
          }
        ],
        [
          {
            title: '产业地图',
            list: [
              { id: '11', icon: 'el-icon-s-help', label: '企业GIS图层' },
              { id: '12', icon: 'el-icon-minus', label: '产业地图' },
              { id: '13', icon: 'el-icon-check', label: '专题图层' },
              { id: '14', icon: 'el-icon-upload', label: '战略产业集群分析' },
              { id: '15', icon: 'el-icon-upload2', label: '区域行业分析' }
            ]
          },
          {
            title: '数据管理',
            list: [
              { id: '16', icon: 'el-icon-camera-solid', label: '数据管控大屏' },
              { id: '17', icon: 'el-icon-s-platform', label: '数据管理中心' },
              { id: '18', icon: 'el-icon-s-fold', label: '企业标签' }
            ]
          },
          {
            title: '数据分析',
            list: [{ id: '19', icon: 'el-icon-s-home', label: '数据分析' }]
          }
        ],
        [
          {
            title: '制造业大数据指数',
            list: [
              { id: '20', icon: 'el-icon-s-shop', label: '指数信息' },
              { id: '21', icon: 'el-icon-s-marketing', label: '指数指标信息' },
              { id: '22', icon: 'el-icon-s-comment', label: '行业评估值信息' },
              {
                id: '23',
                icon: 'el-icon-s-opportunity',
                label: '行业评估值信息'
              }
            ]
          },
          {
            title: '基础服务管理',
            list: [
              { id: '24', icon: 'el-icon-share', label: '组织架构' },
              { id: '25', icon: 'el-icon-d-caret', label: '用户管理' },
              { id: '26', icon: 'el-icon-caret-right', label: '角色管理' },
              { id: '27', icon: 'el-icon-refresh-left', label: '权限管理' },
              { id: '28', icon: 'el-icon-date', label: '平台日志' }
            ]
          }
        ],
        [
          {
            title: '企业全景画像',
            list: [
              { id: '29', icon: 'el-icon-tickets', label: '企业画像' },
              {
                id: '30',
                icon: 'el-icon-document-delete',
                label: '企业经营信息'
              },
              { id: '31', icon: 'el-icon-printer', label: '信用风险信息' },
              { id: '32', icon: 'el-icon-search', label: '排行榜信息' }
            ]
          }
        ]
      ]
    };
  },
  methods: {
    ...mapActions(['handlerDestroy']),
    /**
     * @desc 设置默认选中项
     */
    setCheckedMenu(to, from) {
      let navMenus = this.getMenus;
      const aPathKeyList = [];
      for (const value of Object.values(to.matched)) {
        if (value.name !== this.ROOT_PAGE_NAME) {
          const index = _findIndex(
            navMenus,
            menu => menu.menuCode === value.name
          );
          if (index !== -1) {
            navMenus = navMenus[index].children;
            aPathKeyList.push(index);
          }
        }
      }
      if (to.name === this.ROOT_PAGE_NAME) {
        setTimeout(() => {
          this.menuProps.defaultActive = this.$refs.menu.getFirstElMenuItem();
          const index2LastMenu = this.$refs.menu.getLastMenu(
            this.menuProps.defaultActive
          );
          if (!_isEmpty(index2LastMenu.menuCode)) {
            this.$router.push({ name: index2LastMenu.menuCode });
          }
          /* this.$router.push({
            path: `/${this.$refs.menu.getRouterPath(
              this.menuProps.defaultActive
            )}`
          }); */
        }, 0);
      }
      if (to.name !== this.ROOT_PAGE_NAME && !_isEmpty(aPathKeyList)) {
        const sPathKey = _join(aPathKeyList, '-'); // 0-0-1
        setTimeout(() => {
          this.menuProps.defaultActive = sPathKey;
          this.getBase3Layout.breadCrumbOptions = this.$refs.menu.getKeyPath2BreadCrumbPath(
            sPathKey
          ); // 设置面包屑
        }, 0);
      }
    },
    /**
     * @desc 菜单激活回调
     */
    handleSelect(key, keyPath) {
      const aKeyPathList = _split(_last(keyPath), '-');
      let menu = null;
      for (let i = 0, len = aKeyPathList.length; i < len; i++) {
        if (i === 0) {
          menu = this.getMenus[aKeyPathList[i]];
        } else {
          menu = menu.children[aKeyPathList[i]];
        }
      }
      if (
        this.$route.name !== menu.menuCode &&
        !_isEmpty(menu) &&
        menu.menuCode !== ''
      ) {
        // 外部链接
        if (_has(menu, 'target') && menu.target === 'out') {
          const currentRoute = this.$router.resolve({ name: menu.menuCode });
          const target = _get(currentRoute, 'route.meta.target', '_blank');
          const fullPath = _get(currentRoute, 'route.fullPath', '');
          if (fullPath.length > 0) {
            const routeData = this.$router.resolve({
              path: fullPath
            });
            window.open(routeData.href, target);
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
     * @desc 登出
     * @param {Objetc} event - 事件html对象
     */
    onLoginout(event) {
      this.dialogInstance = this.$baseDialog({
        component: () => this.$createElement('div', {}, ['确认要登出吗?']),
        container: this.$el,
        center: true,
        width: '350px',
        title: '提示',
        slotNode: {
          footer: h => {
            return h('div', {}, [
              h(
                'el-button',
                {
                  on: {
                    click: () => {
                      this.dialogInstance.close();
                    }
                  }
                },
                ['取消']
              ),
              h(
                'el-button',
                {
                  props: { type: 'primary', loading: this.logoutLoading },
                  on: {
                    click: () => {
                      this.logoutLoading = true;
                      this.handlerDestroy()
                        .then(() => {
                          this.logoutLoading = false;
                          this.dialogInstance.close();
                          this.$router.push({ name: LOGIN_PAGE_NAME });
                        })
                        .catch(error => {
                          throw new Error(error);
                        })
                        .finally(() => {});
                    }
                  }
                },
                ['确定']
              )
            ]);
          }
        }
      });
      this.dialogInstance.open();
    },
    /**
     * @desc 全屏
     * @param {Objetc} event - 事件html对象
     */
    onClickFullScreen(event) {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '不支持全屏',
          type: 'warning'
        });
        return false;
      }
      this.isFullscreen = !this.isFullscreen;
      screenfull.toggle();
    },
    /**
     * @desc 下拉面板菜单-点击
     * @param {Objetc} event - 事件html对象
     * @param {option} option - 参数对象
     */
    onDropColumnDownClick(event, option = {}) {
      console.info('下拉面板菜单-点击 ', event, option);
    }
  }
};
</script>

<style lang="less" module>
@import '../basic-layout.less';
@import './less/top-view.less';
</style>
