<template>
  <div>
    对不起，你没有访问该页面的权限，点击返回主页
    <el-button type="primary" @click="onToHome">
      Back Home
    </el-button>
  </div>
</template>

<script>
import { ROOT_PAGE_NAME } from '@config/index.js';

export default {
  name: 'Exception403',
  methods: {
    onToHome() {
      this.$router.push({ name: ROOT_PAGE_NAME });
    }
  }
};
</script>
