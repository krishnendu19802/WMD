const express = require('express')
const { hashPassword } = require('../helper/authHelper')
const Router = express.Router()

module.exports = (conn) => {
    // console.log('reached here')
    Router.post('/', async (req, res) => {
        try {

            if (req.body.type === 'doctor') {
                let values = req.body
                values.password = await hashPassword(values.password)
                values = { ...values, "review": 0, "count": 0 };
                delete values.type
                console.log(values);
                console.log("Hi");

                let sql = `INSERT INTO doctor VALUES (?)`;
                conn.query(sql, [Object.values(values)], (error, result) => {
                    if (error) {
                        res.send({ status: false, message: "Error in register" })
                    }
                    else {
                        delete values.password
                        res.send({ status: true, content: values })
                    }
                })
            }

            else {
                const values = req.body
                values.password = await hashPassword(values.password)
                delete values.type

                let sql = `INSERT INTO patient VALUES (?)`;
                conn.query(sql, [Object.values(values)], (error, result) => {
                    if (error) res.send({ status: false, message: "Error in register" })
                    else {
                        delete values.password
                        res.send({ status: true, content: values })
                    }
                })
            }

        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in registration",
                error
            })
        }
    })
    return Router
}

