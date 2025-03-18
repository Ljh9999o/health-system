const User = require('../models/userModel');

const userController = {
    // 用户注册
    async register(req, res) {
        try {
            const { phone, password, name, gender, birthdate, email } = req.body;
            const user = await User.create({ phone, password, name, gender, birthdate, email });
            res.status(201).json({ message: '用户注册成功', user });
        } catch (error) {
            res.status(500).json({ message: '用户注册失败', error });
        }
    },

    // 用户登录
    async login(req, res) {
        try {
            const { phone, password } = req.body;
            const user = await User.findByPhone(phone);
            if (!user || user.password !== password) {
                return res.status(401).json({ message: '手机号或密码错误' });
            }
            res.status(200).json({ message: '登录成功', user });
        } catch (error) {
            res.status(500).json({ message: '登录失败', error });
        }
    }
};

module.exports = userController;