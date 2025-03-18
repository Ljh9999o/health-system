const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');

const consultationRoutes = require('./routes/consultationRoutes');

const pointRoutes = require('./routes/pointRoutes');

const announcementRoutes = require('./routes/announcementRoutes');

const healthPlanRoutes = require('./routes/healthPlanRoutes');

const checkupReminderRoutes = require('./routes/checkupReminderRoutes');

const reviewRoutes = require('./routes/reviewRoutes');

const appointmentRoutes = require('./routes/appointmentRoutes');

// 加载环境变量
dotenv.config();

// 创建 Express 应用
const app = express();

// 使用中间件
app.use(cors());
app.use(express.json());

// 使用预约路由
app.use('/api/appointments', appointmentRoutes);

// 使用评价路由
app.use('/api/reviews', reviewRoutes);

// 使用体检提醒路由
app.use('/api/checkup-reminders', checkupReminderRoutes);

// 使用健康计划路由
app.use('/api/health-plans', healthPlanRoutes);

// 使用公告路由
app.use('/api/announcements', announcementRoutes);

// 使用积分路由
app.use('/api/points', pointRoutes);

// 使用咨询路由
app.use('/api/consultations', consultationRoutes);

// 使用用户路由
app.use('/api/users', userRoutes);

// 使用病例路由
app.use('/api/medical', medicalRecordRoutes);

// 定义根路由
app.get('/', (req, res) => {
  res.send('Hello, Health System!');
});

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const indexRouter = require('./routes/index');

// 使用路由
app.use('/api', indexRouter);
