<template>
  <div class="health-plan-container">
    <!-- 头部操作栏 -->
    <div class="header">
      <h2>我的健康计划</h2>
      <el-button type="primary" @click="showCreateDialog">创建新计划</el-button>
    </div>

    <!-- 计划列表表格 -->
    <el-table :data="plans" style="width: 100%" stripe>
      <el-table-column prop="plan_name" label="计划名称" width="180" />
      <el-table-column prop="description" label="计划内容" />

      <el-table-column prop="start_date" label="开始日期" width="120">
        <template #default="{ row }">
          {{ formatDate(row.start_date) }}
        </template>
      </el-table-column>

      <el-table-column prop="end_date" label="结束日期" width="120">
        <template #default="{ row }">
          {{ formatDate(row.end_date) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="danger" size="mini" @click="deletePlan(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 创建计划弹窗 -->
    <el-dialog title="创建健康计划" v-model="dialogVisible" width="600px">
      <el-form :model="newPlan" label-width="100px">
        <el-form-item label="计划名称" required>
          <el-input v-model="newPlan.plan_name" placeholder="例如：减肥计划" />
        </el-form-item>
        <el-form-item label="计划内容" required>
          <el-input v-model="newPlan.description" type="textarea" :rows="3" placeholder="详细描述计划内容" />
        </el-form-item>
        <el-form-item label="开始日期" required>
          <el-date-picker v-model="newPlan.start_date" type="date" format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="结束日期" required>
          <el-date-picker v-model="newPlan.end_date" type="date" format="YYYY-MM-DD" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createPlan">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

import dayjs from 'dayjs';

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

// 响应式数据
const plans = ref([]);
const dialogVisible = ref(false);
const newPlan = ref({
  plan_name: '',
  description: '',
  start_date: '',
  end_date: ''
});

// 显示创建计划弹窗
const showCreateDialog = () => {
  dialogVisible.value = true;
};

// 获取健康计划列表
const fetchPlans = async () => {
  try {
    const user_id = localStorage.getItem('user_id');
    const res = await axios.get(`/api/health-plans/${user_id}`);
    plans.value = res.data.plans;
  } catch (error) {
    ElMessage.error(`加载失败：${error.response?.data.message || '未知错误'}`);
  }
};

// 创建计划
const createPlan = async () => {
  try {
    const user_id = localStorage.getItem('user_id'); // 必须已登录并保存
    if (!user_id) {
      ElMessage.error('请先登录');
      return;
    }
    // 格式化日期
    const formattedPlan = {
      ...newPlan.value,
      start_date: dayjs(newPlan.value.start_date).format('YYYY-MM-DD'),
      end_date: dayjs(newPlan.value.end_date).format('YYYY-MM-DD')
    };
    await axios.post('/api/health-plans', {
      user_id,
      ...formattedPlan
    });
    ElMessage.success('创建成功');
    dialogVisible.value = false;
    // 清空表单
    newPlan.value = {
      plan_name: '',
      description: '',
      start_date: '',
      end_date: ''
    };
    fetchPlans(); // 提交成功后刷新列表
  } catch (error) {
    ElMessage.error(`创建失败：${error.response?.data.message || '未知错误'}`);
  }
};

// 删除计划
const deletePlan = async (id) => {
  try {
    await axios.delete(`/api/health-plans/${id}`);
    ElMessage.success('删除成功');
    fetchPlans(); // 刷新列表
  } catch (error) {
    ElMessage.error(`删除失败：${error.response?.data.message || '未知错误'}`);
  }
};

// 初始化加载数据
onMounted(() => {
  fetchPlans();
});
</script>

<style lang="scss" scoped>
.health-plan-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      color: #2c3e50;
      margin: 0;
    }
  }

  .el-table {
    margin-top: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  }
}
</style>