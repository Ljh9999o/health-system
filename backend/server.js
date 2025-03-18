const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');


// 加载环境变量
dotenv.config();

// 创建 Express 应用
const app = express();

// 使用中间件
app.use(cors());
app.use(express.json());

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