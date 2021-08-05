<template>
  <div :class="$style.container">
    <div :class="$style.loginBox">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input
            v-focus="'focused'"
            v-model="form.name"
            placeholder="admin"
            clearable
            v-emoji
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pswd">
          <el-input
            v-model="form.pswd"
            :type="flag ? 'text' : 'password'"
            placeholder="admin or super"
            v-on:keyup.enter.native="onSubmit"
          >
            <i
              slot="suffix"
              :class="[flag ? 'el-icon-minus' : 'el-icon-view']"
              style="margin-top: 8px;font-size: 18px;cursor: pointer;"
              autocomplete="auto"
              @click="flag = !flag"
            />
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="form.remember">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item label="">
          <el-radio-group v-model="radio">
            <el-radio :label="1">布局风格1</el-radio>
            <el-radio :label="2">布局风格2</el-radio>
            <el-radio :label="3">布局风格3</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit"
            >登录</el-button
          >
          <el-button type="primary" v-debounce="onSubmit"
            >防抖动指令-登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import md5 from 'js-md5';
import { ROOT_PAGE_NAME } from '@config/index.js';

export default {
  computed: {
    ...mapGetters(['platform/getLoginCacheUserInfo'])
  },
  data() {
    return {
      loading: false,
      form: {
        name: 'admin',
        pswd: 'admin',
        remember: false
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pswd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      flag: false,
      radio: 1
    };
  },
  created() {
    this.$nextTick(() => {
      this.form.name = this['platform/getLoginCacheUserInfo'].username;
      this.form.pswd = this['platform/getLoginCacheUserInfo'].password;
      this.form.remember = this['platform/getLoginCacheUserInfo'].remember;
    });
  },
  methods: {
    ...mapActions(['platform/handleLogin', 'platform/setLayout']),
    onSubmit(event) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          this['platform/handleLogin']({
            userName: this.form.name,
            password:
              // 判断传入的密码是否进行过md5加密，若加密过则不加密
              this['platform/getLoginCacheUserInfo'].password === this.form.pswd
                ? this.form.pswd
                : md5(this.form.pswd),
            remember: this.form.remember
          })
            .then(resData => {
              this['platform/setLayout']({ layout: this.radio });
              this.$router.push({ name: ROOT_PAGE_NAME });
            })
            .catch(error => {
              console.info(error);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onClick(event, option = {}) {
      console.info(event, option);
    },
    debounceClick() {
      console.log('只触发一次');
    }
  }
};
</script>
<style lang="less" module>
.container {
  height: 100%;
  background: rgba(240, 242, 245) url('~@assets/images/background.svg')
    no-repeat 50%;
}
.login-box {
  position: relative;
  top: 100px;
  width: 500px;
  margin: 0 auto;
}
</style>
