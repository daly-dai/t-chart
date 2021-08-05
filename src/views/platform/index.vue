<template>
  <component v-bind:is="currentTabComponent"></component>
</template>

<script>
import {
  BasicLayout,
  Basic2Layout,
  Basic3Layout
} from '@packages/views/index.js';
import { mapGetters } from 'vuex';

export default {
  components: { BasicLayout, Basic2Layout, Basic3Layout },
  computed: {
    ...mapGetters(['platform/getLayout']),
    layout() {
      return this['platform/getLayout'];
    }
  },
  data() {
    return {
      currentTabComponent: BasicLayout
    };
  },
  created() {
    if (this.layout === 2) {
      this.currentTabComponent = Basic2Layout;
    }
    if (this.layout === 3) {
      this.currentTabComponent = Basic3Layout;
    }
  }
};
</script>
