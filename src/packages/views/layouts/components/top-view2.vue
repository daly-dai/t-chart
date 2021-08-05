<template>
  <base-double-wing :isMiddleScroll="false">
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
      <base-block-group
        :class="$style.buttonGroupCls"
        :defaultActive.sync="buttonGroupOption.defaultActive"
        v-bind="buttonGroupOption"
        :buttonGroup="getLevel1Menus"
        @click="onBlockClick"
      ></base-block-group>
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
import screenfull from 'screenfull';
import {
  ROOT_PAGE_NAME,
  LOGIN_PAGE_NAME,
  DEFAULT_SETTINGS
} from '@config/index.js';
import { mapActions, mapGetters } from 'vuex';
import _find from 'lodash/find';
import _omit from 'lodash/omit';
import _has from 'lodash/has';
import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';
import _join from 'lodash/join';
import _drop from 'lodash/drop';
import _concat from 'lodash/concat';
import _get from 'lodash/get';
import _split from 'lodash/split';
import _map from 'lodash/map';
import _findIndex from 'lodash/findIndex';
import _last from 'lodash/last';

export default {
  name: 'TopView2',
  inject: ['getBase2Layout'],
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
    ...mapGetters(['getUserData']), // , 'getMenus', 'getLevel1Menus'
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
    },
    getLevel1Menus() {
      if (this.ROOT_PAGE_NAME !== ROOT_PAGE_NAME) {
        const menus = _find(
          this.$store.getters.getMenus,
          menu => menu.menuCode === this.ROOT_PAGE_NAME
        );
        if (_isNil(menus)) {
          return [];
        }
        const level1Menus = [];
        !_has(menus, 'children') && (menus.children = []);
        for (let i = 0, len = menus.children.length; i < len; i++) {
          level1Menus.push(_omit(menus.children[i], ['children', 'buttons']));
        }
        return level1Menus;
      }
      return this.$store.getters.getLevel1Menus;
    }
  },
  watch: {
    // 监听路由改变，路由动态改变（获取路由对应的一级菜单项）
    $route: {
      handler(to, from) {
        if (!_isEmpty(to.matched)) {
          const rootPageName = to.matched[0].name; // 匹配到的路由路径列表，第一个是匹配到的根路由
          if (rootPageName !== this.ROOT_PAGE_NAME) {
            this.ROOT_PAGE_NAME = rootPageName;
          }
        }
        const aPathKeyList = this.getPathKeyList();
        if (!_isEmpty(aPathKeyList)) {
          if (aPathKeyList[0] !== this.buttonGroupOption.defaultActive) {
            this.buttonGroupOption.defaultActive = aPathKeyList[0];
          }
        }
      },
      immediate: true
    }
  },
  data() {
    this.ROOT_PAGE_NAME = ROOT_PAGE_NAME; // 根路由名称
    this.checkedFirstMenu = null; // 选中的一级菜单
    this.checkedFirstMenu2BlockIndex = '';
    this.checkMenuIndexPath = '';
    return {
      logoutLoading: false,
      isFullscreen: false,
      iconfontUrl: DEFAULT_SETTINGS.iconfontUrl,
      titleClick: DEFAULT_SETTINGS.titleClick.bind(this),
      buttonGroupOption: {
        itemWidth: '120px',
        height: '64px',
        textColor: '#BFCBD9',
        activeTextColor: '#4989F4',
        backgroundColor: '#fff',
        defaultActive: 0,
        activeCls: this.$style.activeCls
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
    ...mapActions(['handlerDestroy', 'getChildrenMenus']),
    /**
     * @desc 顶部点击事件
     */
    onBlockClick(event, menu = {}, index) {
      /* if (this.$route.name === this.ROOT_PAGE_NAME && !DEFAULT_SETTINGS.isOpenMenuToRouter) {
        return;
      } */
      if (menu) {
        this.checkedFirstMenu = menu; // 一级菜单
        // 切换菜单栏
        this.getChildrenMenus({ ...menu, menus: this.getMenus })
          .then(resData => {
            this.getBase2Layout.$refs.menu.setGrade1Index(index);
            // this.getBase2Layout.menus = resData; // 触发 watch
            this.getBase2Layout.setMenus(resData);
            setTimeout(() => {
              const aPathKeyList = this.getPathKeyList();
              let menuDefaultActive = '';
              let firstSubMenuIndex = '';
              if (_isEmpty(aPathKeyList)) {
                menuDefaultActive = this.getBase2Layout.$refs.menu.getFirstElMenuItem(); // 0-0-0
                firstSubMenuIndex = this.getBase2Layout.$refs.menu.getFirstSubMenuIndex(); // 0-0
              } else {
                menuDefaultActive = _join(aPathKeyList, '-'); // 0-0-1
                firstSubMenuIndex = _join(
                  aPathKeyList.length === 3
                    ? _drop(aPathKeyList, 1)
                    : aPathKeyList,
                  '-'
                ); // 0-0-1->0-1
              }
              if (this.checkedFirstMenu2BlockIndex === '') {
                // 初始模块并且没有点击过其它菜单项
                // this.getBase2Layout.menuProps.defaultActive = menuDefaultActive;
                this.handleRefreshPage(menuDefaultActive, [
                  firstSubMenuIndex,
                  menuDefaultActive
                ]);
              }
              if (this.checkedFirstMenu2BlockIndex === index) {
                // 点击过其它菜单项
                // this.getBase2Layout.menuProps.defaultActive = menuDefaultActive;
              }
              if (this.checkedFirstMenu2BlockIndex !== index) {
                // 当前点击不是初始模块并且没有点击菜单项
                if (
                  !_isEmpty(this.getBase2Layout.$refs.menu.getSubMenuList())
                ) {
                  this.getBase2Layout.$refs.menu.open(
                    this.getBase2Layout.$refs.menu.getFirstSubMenuIndex()
                  );
                }
                if (aPathKeyList[0] === this.buttonGroupOption.defaultActive) {
                  this.getBase2Layout.menuProps.defaultActive =
                    _split(aPathKeyList, '-') + '-0'; // 5->5-0
                  const menuList = [];
                  for (let i = 0, len = aPathKeyList.length; i < len; i++) {
                    if (i === 0) {
                      menu = this.getBase2Layout.menus[aPathKeyList[i]];
                    } else {
                      menu = menu.children[aPathKeyList[i]];
                    }
                    menu && menuList.push(menu);
                  }
                  if (_isNil(menu)) {
                    menu = this.getBase2Layout.menus[0];
                    menuList.push(menu);
                  }
                  this.getBase2Layout.breadCrumbOptions = _concat(
                    { text: _get(this.checkedFirstMenu, 'menuName', '') },
                    _map(menuList, menu => ({ text: menu.menuName }))
                  ); // 设置面包屑
                }
              }
            }, 0);
          })
          .catch(error => {
            throw new Error(error);
          });
      }
    },
    getPathKeyList() {
      let navMenus = this.getMenus;
      const aPathKeyList = [];
      for (const value of Object.values(this.$route.matched)) {
        if (value.name !== this.ROOT_PAGE_NAME && !_isEmpty(navMenus)) {
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
      return aPathKeyList;
    },
    /**
     * @desc 刷新页面
     */
    handleRefreshPage(key, keyPath) {
      this.checkedFirstMenu2BlockIndex = this.buttonGroupOption.defaultActive;
      let aKeyPathList = _split(_last(keyPath), '-');
      if (aKeyPathList.length > 1) {
        aKeyPathList = _drop(_split(_last(keyPath), '-'), 1);
      }
      let menu = null;
      const menuList = [];
      for (let i = 0, len = aKeyPathList.length; i < len; i++) {
        if (i === 0) {
          menu = this.getBase2Layout.menus[aKeyPathList[i]];
        } else {
          menu = menu.children[aKeyPathList[i]];
        }
        menu && menuList.push(menu);
      }
      if (_isNil(menu)) {
        menu = this.getBase2Layout.menus[0];
        menuList.push(menu);
      }
      if (!_isEmpty(menu) && menu.menuCode !== '') {
        if (_split(key, '-').length === 1) {
          this.getBase2Layout.menuProps.defaultActive = this.getBase2Layout.$refs.menu.getFirstElMenuItem(); // 设置选中的菜单
        } else {
          this.getBase2Layout.menuProps.defaultActive = key; // 设置选中的菜单
        }
        this.getBase2Layout.breadCrumbOptions = _concat(
          { text: _get(this.checkedFirstMenu, 'menuName', '') },
          _map(menuList, menu => ({ text: menu.menuName }))
        ); // 设置面包屑
        if (this.$route.name === this.ROOT_PAGE_NAME) {
          this.$router.push({ name: menu.menuCode });
        }
      }
    },
    /**
     * @desc 下拉面板菜单-点击
     * @param {Objetc} event - 事件html对象
     * @param {option} option - 参数对象
     */
    onDropColumnDownClick(event, option = {}) {
      console.info('下拉面板菜单-点击 ', event, option);
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
     * @desc 获取顶部 base-block-group 的配置项
     */
    getButtonGroupOption() {
      return this.buttonGroupOption;
    },
    setCheckedFirstMenu2BlockIndex(defaultActive) {
      this.checkedFirstMenu2BlockIndex = defaultActive;
    }
  }
};
</script>

<style lang="less" module>
@import '../basic-layout.less';
@import './less/top-view2.less';
</style>
