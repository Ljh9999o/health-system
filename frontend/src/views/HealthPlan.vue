<template>
    <el-table :data="plans">
      <el-table-column prop="plan_name" label="计划名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
    </el-table>
  </template>
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const plans = ref([]);
  onMounted(async () => {
    const res = await axios.get('/api/health-plans/1');  // 用户ID需动态获取
    plans.value = res.data.plans;
  });
  </script>