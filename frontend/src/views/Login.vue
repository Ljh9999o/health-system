<template>
  <div class="login-container">
    <el-form @submit.prevent="handleLogin">
      <el-input v-model="form.phone" placeholder="手机号" />
      <el-input v-model="form.password" type="password" placeholder="密码" />
      <el-button type="primary" native-type="submit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserLogin'
}
</script>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  phone: '',
  password: ''
})

const handleLogin = async () => {
  try {
    // 移除未使用的 res 变量
    await axios.post('/api/users/login', form.value)
    ElMessage.success('登录成功！')
    router.push('/profile')
  } catch (error) {
    // 可选：显示具体错误信息
    ElMessage.error(`登录失败：${error.response?.data?.message || '网络错误'}`)
    console.error('登录错误详情:', error.response?.data)
  }
}
</script>

<style scoped>
.login-container {
  width: 400px;
  margin: 100px auto;
}
</style>