const DietPlan = require('../models/dietPlanModel');

const dietPlanController = {
    // 创建饮食计划
    async createPlan(req, res) {
        try {
            const { user_id, plan_name, description, start_date, end_date } = req.body;
            const result = await DietPlan.create({ user_id, plan_name, description, start_date, end_date });
            res.status(201).json({ message: '饮食计划创建成功', result });
        } catch (error) {
            res.status(500).json({ message: '饮食计划创建失败', error });
        }
    },

    // 查询用户的饮食计划
    async getPlansByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const plans = await DietPlan.findByUserId(user_id);
            res.status(200).json({ message: '查询成功', plans });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 删除饮食计划
    async deletePlan(req, res) {
        try {
            const { id } = req.params;
            const result = await DietPlan.deleteById(id);
            res.status(200).json({ message: '饮食计划删除成功', result });
        } catch (error) {
            res.status(500).json({ message: '饮食计划删除失败', error });
        }
    }
};

module.exports = dietPlanController;