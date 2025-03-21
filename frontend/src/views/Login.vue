<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <img src="@/assets/logo.png" alt="健康系统Logo">
        <h1>个性化健康在线服务系统</h1>
      </div>
      <el-form @submit.prevent="handleLogin">
        <el-form-item>
          <el-input 
            v-model="form.phone" 
            placeholder="请输入手机号" 
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-button 
          type="primary" 
          native-type="submit" 
          class="login-btn"
          :loading="loading"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin'
}
</script>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({
  phone: '',
  password: ''
});
const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;
    await axios.post('/api/users/login', form.value);
    ElMessage.success('登录成功！');
    router.push('/profile');
  } catch (error) {
    ElMessage.error(`登录失败：${error.response?.data.message || '未知错误'}`);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  background: linear-gradient(135deg, #6b8dd6 0%, #8e37d7 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-card {
    background: rgba(255, 255, 255, 0.95);
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    width: 400px;

    .logo {
      text-align: center;
      margin-bottom: 30px;

      img {
        width: 100px;
        height: 100px;
        margin-bottom: 15px;
      }

      h1 {
        color: #2c3e50;
        font-size: 22px;
        margin: 0;
      }
    }

    .el-input__inner {
      height: 45px;
      font-size: 16px;
    }

    .login-btn {
      width: 100%;
      height: 45px;
      font-size: 16px;
      margin-top: 20px;
    }
  }
}
</style>