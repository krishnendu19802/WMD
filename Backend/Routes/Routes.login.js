const express = require('express')
const { comparePassword } = require('../helper/authHelper')
const Router = express.Router()
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (conn) => {
    // console.log('reached here')

    function verifyToken(req, res, next) {
        // Check for token in headers
        // console.log('header',req.headers)
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            next()
        }
        // Verify token
        else {


            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    next()

                }
                // Token is valid, attach decoded user information to request object
                req.user = decoded;
                // console.log("hello", req.user)
                // res.send(['Correct', { type: req.user.type, email: req.user.email, }])
                let sql = `SELECT * from ${decoded.type} where email='${decoded.email}'`
                conn.query(sql, (error, result) => {
                    if (error) res.status(400).send(error)
                    else if (result.length == 0) {
                        res.status(400).send('Invalid credentials')
                    }
                    else{
                        delete result[0].password
                        res.send({
                            status:true,
                            user:{...result[0],type:decoded.type},
                            

                        })
                    }
                })

            });
        }
    }

    Router.post('/', verifyToken, (req, res) => {
        try {
            const { email, password, type } = req.body
            let sql = `SELECT * FROM ${type} WHERE email = '${email}';`
            conn.query(sql, async (error, result) => {
                if (error) res.status(400).send(error)
                else if (result.length == 0)
                    res.send({ status: false, message: "Invalid email" })
                else {
                    //password matching
                    const match = await comparePassword(password, result[0].password);
                    if (!match) {
                        return res.status(200).send({
                            status: false,
                            message: 'Incorrect Password'
                        })
                    }
                    else {
                        delete result[0].password;
                        //token
                        const token = await jwt.sign({ email: result[0].email, type: type }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
                        res.send({
                            status: true,
                            user: { ...result[0], "type": type },
                            token
                        })
                    }

                }
            })
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


