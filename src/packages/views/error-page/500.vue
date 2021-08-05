<template>
  <div>
    对不起，服务出现异常，点击返回主页
    <el-button type="primary" @click="onToHome">
      Back Home
    </el-button>
  </div>
</template>

<script>
import { ROOT_PAGE_NAME } from '@config/index.js';

export default {
  name: 'Exception500',
  methods: {
    toHome() {
      this.$router.push({ name: ROOT_PAGE_NAME });
    }
  }
};
</script>
