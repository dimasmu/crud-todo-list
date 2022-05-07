const models = require("../../../models")
const {Op} = require('sequelize');
const current = new Date()
const {saveTodoList,updateTodoList} = require('../../validation/todoValidate/index');
const { sequelize, Sequelize } = require('../../../models');
// //model
const todoItems = models.todoItems;

module.exports = {
    async getTodoList(req,res){
        try {
            let whereArray = [];
            let whereObject = {};
            let setLimit = parseInt(req.query.limit !== undefined && req.query.limit !== null && req.query.limit !== '' ? req.query.limit : 10)
            if(req.query.id !== undefined){
                whereArray.push({id : req.query.id})
            }

            if(req.query.title !== undefined){
                whereArray.push({title : req.query.title})
            }

            if(req.query.activity_group_id !== undefined){
                whereArray.push({activity_group_id : req.query.activity_group_id})
            }

            if(req.query.is_active !== undefined){
                whereArray.push({is_active : parseInt(req.query.is_active)})
            }

            if(req.query.priority !== undefined){
                whereArray.push({priority : req.query.priority})
            }

            if(typeof whereArray !== 'undefined' && whereArray.length > 0){
                whereObject.where = {
                    [Op.and]: whereArray
                }
            }

            const countTotal = await todoItems.count({...whereObject})
            const getTodo = await todoItems.findAll({
                ...whereObject,
                limit : setLimit
            });

            if(countTotal === 0){
                return res.status(404).json({
                    name: "NotFound",
                    message: `No record found`,
                    code: 404,
                    className: "not-found",
                    errors: {}
                });
            }

            return res.status(200).json({
                total : countTotal,
                limit : setLimit,
                data : getTodo
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: JSON.stringify(error),
                code: 500,
                className: "general-error",
            })
        }
    },
    async getSpesificTodoList(req,res){
        try {
            const getTodo = await todoItems.findOne({
                where : {
                    id : parseInt(req.params.id)
                }
            });

            if(!getTodo){
                return res.status(404).json({
                    name: "NotFound",
                    message: `No record found for id ${req.params.id}`,
                    code: 404,
                    className: "not-found",
                    errors: {}
                });
            }

            return res.status(200).json({
                ...getTodo.dataValues
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: JSON.stringify(error),
                code: 500,
                className: "general-error",
            })
        }
    },
    async saveTodoList(req,res){
        sequelize.transaction(async (t) => {
            try {
                const result = saveTodoList.validate(req.body);
                const {value, error} = result;
                const valid = error == null;
                if (!valid) {
                    return res.status(400).json({
                        name : "BadRequest",
                        message: error.message,
                        code : 400,
                        className : "bad-request"
                    });
                }
                const saveTodo = await todoItems.create({
                    title: value.title,
                    activity_group_id: value.activity_group_id,
                    is_active: value.is_active,
                    priority: value.priority,
                    created_at : current,
                    updated_at : current
                },{transaction : t})

                saveTodo.dataValues.is_active = saveTodo.dataValues.is_active === 1 ? true : false

                return res.status(200).json({
                    ...saveTodo.dataValues
                });

            } catch (error) {
                await t.rollback()
                console.log(error)
                return res.status(500).json({
                    message: error.message,
                    code: 500,
                    className: "general-error",
                })
            }
        })
    },
    async updateTodoList(req, res){
        sequelize.transaction(async (t) => {
            try {
                const result = updateTodoList.validate(req.params);
                const {value, error} = result;
                const valid = error == null;
                if (!valid) {
                    return res.status(400).json({
                        name : "BadRequest",
                        message: error.message,
                        code : 400,
                        className : "bad-request"
                    });
                }

                const cekTodoList = await todoItems.findByPk(value.id)

                if(!cekTodoList){
                    return res.status(404).json({
                        name: "NotFound",
                        message: `No record found for id ${value.id}`,
                        code: 404,
                        className: "not-found",
                    });
                }

                await todoItems.update(
                    {
                        title: req.body.title,
                        activity_group_id: req.body.activity_group_id,
                        is_active: req.body.is_active,
                        priority: req.body.priority,
                        updated_at : current
                    },
                    {
                        where : {
                            id : value.id
                        },transaction : t
                    }
                )

                await t.afterCommit(async() => {
                    const getTodoList = await todoItems.findByPk(value.id)
                    return res.status(200).json({
                        ...getTodoList.dataValues
                    });
                })

            } catch (error) {
                await t.rollback()
                console.log(error)
                return res.status(500).json({
                    message: error.message,
                    code: 500,
                    className: "general-error",
                })
            }
        })
    },
    async deleteTodoList(req, res){
        sequelize.transaction(async (t) => {
            try {
                const result = updateTodoList.validate(req.params);
                const {value, error} = result;
                const valid = error == null;
                if (!valid) {
                    return res.status(400).json({
                        name : "BadRequest",
                        message: error.message,
                        code : 400,
                        className : "bad-request"
                    });
                }

                const cekTodoList = await todoItems.findByPk(value.id)

                if(!cekTodoList){
                    return res.status(404).json({
                        name: "NotFound",
                        message: `No record found for id ${value.id}`,
                        code: 404,
                        className: "not-found",
                    });
                }

                await todoItems.destroy({
                        where : {
                            id : value.id
                        },transaction : t
                })

                return res.status(200).json({});

            } catch (error) {
                await t.rollback()
                console.log(error)
                return res.status(500).json({
                    message: error.message,
                    code: 500,
                    className: "general-error",
                })
            }
        })
    }
}
