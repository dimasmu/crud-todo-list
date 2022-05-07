const Joi = require('joi');

const saveTodoList = Joi.object().keys({
    title : Joi.string().required(),
    activity_group_id : Joi.number().integer().required(),
    is_active : Joi.number().integer().max(1).required(),
    priority : Joi.string().allow('',null)
})

const updateTodoList = Joi.object().keys({
    id : Joi.number().integer().required()
})

const updateActivityGroup = Joi.object().keys({
    id : Joi.number().integer().required()
})

const saveActivityGroupSchema = Joi.object().keys({
    title : Joi.string().required(),
    email : Joi.string().allow(null,'')
})

module.exports = {
    saveTodoList,
    updateTodoList,
    saveActivityGroupSchema,
    updateActivityGroup
}