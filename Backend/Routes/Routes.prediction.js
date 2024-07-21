const express = require('express')
const { comparePassword } = require('../helper/authHelper')
const Router = express.Router()
const jwt = require('jsonwebtoken');
require('dotenv').config();
const net = require('net');


module.exports = (conn) => {
    // console.log('reached here')

    Router.post('/', (req, res) => {
        const port = 12347;
        const host = '127.0.0.1';
        const { issues } = req.body
        console.log(issues)
        // res.send(issues)
        const client = new net.Socket();
        let is = ''
        let resp=''
        for (let i = 0; i < issues.length; i++) {
            is += issues[i] + ' '
        }
        client.connect(port, host, function () {

            client.write(is, (error, result) => {
                if (error) console.log(error)
                console.log(result)
            })
        });

        client.on('data', function (data) {
            resp=data.toString()
            console.log('Received data from server:', data.toString());

            client.destroy(); // Close the connection
            if(resp==='Please visit an: Emergency Medicine Physician')
            resp='Please visit a: Cardiologist'
            res.send(resp)
        });
    })
    return Router
}


