<template>
    <div class="appointment-container">
      <el-form :model="newAppointment" label-width="120px">
        <el-form-item label="选择医生" required>
          <el-select v-model="newAppointment.doctor_id">
            <el-option
              v-for="doctor in doctors"
              :key="doctor.id"
              :label="doctor.name"
              :value="doctor.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="预约时间" required>
          <el-date-picker
            v-model="newAppointment.appointment_date"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-button type="primary" @click="submitAppointment">提交预约</el-button>
      </el-form>
  
      <el-table :data="appointments">
        <el-table-column prop="doctor_id" label="医生ID" />
        <el-table-column prop="appointment_date" label="预约时间">
          <template #default="{ row }">
            {{ formatDateTime(row.appointment_date) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" />
      </el-table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  import dayjs from 'dayjs';
  
  const formatDateTime = (date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  };

  const newAppointment = ref({
    doctor_id: '',
    appointment_date: ''
  });
  
  const appointments = ref([]);
  const doctors = ref([]);
  
  // 获取医生列表
  const fetchDoctors = async () => {
    try {
      const res = await axios.get('/api/users/doctors');
      doctors.value = res.data.doctors; // 确保数据结构正确
    } catch (error) {
      ElMessage.error('获取医生列表失败');
      console.error('错误详情:', error.response?.data); // 打印详细错误
    }
  };
  
  // 提交预约
  const submitAppointment = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      await axios.post('/api/appointments', {
        user_id,
        ...newAppointment.value
      });
      ElMessage.success('预约成功');
      fetchAppointments();
    } catch (error) {
      ElMessage.error(`预约失败：${error.response?.data.message || '未知错误'}`);
    }
  };
  
  // 获取用户的预约记录
  const fetchAppointments = async () => {
    const user_id = localStorage.getItem('user_id');
    const res = await axios.get(`/api/appointments/${user_id}`);
    appointments.value = res.data.appointments;
  };
  
  onMounted(() => {
    fetchDoctors();
    fetchAppointments();
  });
  </script>