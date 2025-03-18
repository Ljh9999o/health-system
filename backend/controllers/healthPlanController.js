const HealthPlan = require('../models/healthPlanModel');

const healthPlanController = {
    // 创建健康计划
    async createPlan(req, res) {
        try {
            const { user_id, plan_name, description, start_date, end_date } = req.body;
            const result = await HealthPlan.create({ user_id, plan_name, description, start_date, end_date });
            res.status(201).json({ message: '健康计划创建成功', result });
        } catch (error) {
            res.status(500).json({ message: '健康计划创建失败', error });
        }
    },

    // 查询用户的健康计划
    async getPlansByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const plans = await HealthPlan.findByUserId(user_id);
            res.status(200).json({ message: '查询成功', plans });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 删除健康计划
    async deletePlan(req, res) {
        try {
            const { id } = req.params;
            const result = await HealthPlan.deleteById(id);
            res.status(200).json({ message: '健康计划删除成功', result });
        } catch (error) {
            res.status(500).json({ message: '健康计划删除失败', error });
        }
    }
};

module.exports = healthPlanController;