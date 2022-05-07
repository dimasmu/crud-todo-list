const models = require("../../../models")
const {Op} = require('sequelize');
const current = new Date()
const {saveActivityGroupSchema,updateActivityGroup} = require('../../validation/todoValidate/index');
const { sequelize, Sequelize } = require('../../../models');

//model
const activityGroup = models.activityGroup

module.exports = {
    async getActivityGroup(req,res){
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

            if(req.query.created_at !== undefined){
                whereArray.push({created_at : req.query.created_at})
            }

            if(typeof whereArray !== 'undefined' && whereArray.length > 0){
                whereObject.where = {
                    [Op.and]: whereArray
                }
            }

            const countTotal = await activityGroup.count({...whereObject})
            const getTodo = await activityGroup.findAll({
                attributes : ['id','title','email','created_at'],
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
    async getSpesificGroup(req,res){
        try {
            const getActivityGroup = await activityGroup.findOne({
                where : {
                    id : parseInt(req.params.id)
                }
            });

            if(!getActivityGroup){
                return res.status(404).json({
                    name: "NotFound",
                    message: `No record found for id ${req.params.id}`,
                    code: 404,
                    className: "not-found",
                    errors: {}
                });
            }

            return res.status(200).json({
                ...getActivityGroup.dataValues
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
    async saveActivityGroup(req,res){
        sequelize.transaction(async (t) => {
            try {
                const result = saveActivityGroupSchema.validate(req.body);
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
                const saveActivityGroup = await activityGroup.create({
                    title: value.title,
                    email: value.email,
                    created_at : current,
                    updated_at : current
                },{transaction : t})

                return res.status(200).json({
                    ...saveActivityGroup.dataValues
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
    async updateActivityGroup(req, res){
        sequelize.transaction(async (t) => {
            try {
                const result = updateActivityGroup.validate(req.params);
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

                const cekActivityGroup = await activityGroup.findByPk(value.id)

                if(!cekActivityGroup){
                    return res.status(404).json({
                        name: "NotFound",
                        message: `No record found for id ${value.id}`,
                        code: 404,
                        className: "not-found",
                    });
                }

                await activityGroup.update(
                    {
                        title: req.body.title,
                        email: req.body.email,
                        updated_at : current
                    },
                    {
                        where : {
                            id : value.id
                        },transaction : t
                    }
                )

                await t.afterCommit(async() => {
                    const getActivityGroup = await activityGroup.findByPk(value.id)
                    return res.status(200).json({
                        ...getActivityGroup.dataValues
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
    async deleteActivityGroup(req, res){
        sequelize.transaction(async (t) => {
            try {
                const result = updateActivityGroup.validate(req.params);
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

                const cekActivityGroup = await activityGroup.findByPk(value.id)

                if(!cekActivityGroup){
                    return res.status(404).json({
                        name: "NotFound",
                        message: `No record found for id ${value.id}`,
                        code: 404,
                        className: "not-found",
                    });
                }

                await activityGroup.destroy({
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