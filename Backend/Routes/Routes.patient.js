const express = require('express')
const Router = express.Router()
const { hashPassword } = require('../helper/authHelper')
const { sendMail } = require('../helper/mailer')
module.exports = (conn) => {
    // console.log('reached here')

    //finding the doctors available
    Router.post('/find-doctor', (req, res) => {
        const { date, location, specialisation } = req.body;

        let sql = `SELECT * FROM Doctor WHERE specialisation = '${specialisation}' AND location = '${location}';`
        let doc_list = []
        conn.query(sql, (error, result) => {
            if (error) res.status(400).send(error)
            doc_list = result

            let final_list = []
            doc_list.map((doc, index) => {
                console.log(doc, date);
                sql = `SELECT slot_booked FROM booking_details WHERE doctor_email='${doc.email}' AND date_of_appointment='${date}';`
                let arr = new Array(doc.timeslot_end - doc.timeslot_start).fill(1);
                // console.log(arr)
                conn.query(sql, (error, values) => {
                    if (error) res.send(error)
                    // res.send(values)

                    values = values.map((val) => {
                        console.log(val);
                        arr[val['slot_booked']] = 0
                        return val
                    })



                    final_list.push({ ...doc, 'slots': arr })
                    if (index === doc_list.length - 1)
                        res.send(final_list)
                    // console.log(final_list)
                })

            })

        })


    })


    //getting the locations available
    Router.get('/get-locations', (req, res) => {
        // res.send('hi')
        let sql = `SELECT DISTINCT(location) from doctor;`
        conn.query(sql, (error, result) => {
            if (error) res.send(error)
            res.send(result.map(it => it['location']))
        })
    })
    //getting the specialities available
    Router.get('/get-specialities', (req, res) => {
        // res.send('hi')
        let sql = `SELECT DISTINCT(specialisation) from doctor;`
        conn.query(sql, (error, result) => {
            if (error) res.send(error)
            res.send(result.map(it => it['specialisation']))
        })
    })


    //booking for the doctor
    Router.post('/book-doctor', (req, res) => {

        let { patient_email, doctor_email, date_of_appointment, slot_booked } = req.body;

        let doc_name = ''
        let doc_location = ''

        // Location SLOT DATE DOCEMAIL DOCNAME
        let sql_doc = `SELECT name, location, timeslot_start FROM Doctor where email='${doctor_email}';`
        conn.query(sql_doc, (error, result) => {
            if (error) res.status.send(error)
            else {
                doc_name = result[0]['name']
                doc_location = result[0]['location']
                slot_booked += result[0]['timeslot_start']
                // console.log("Doc", doc_name, result);
                sendMail(patient_email, doctor_email, date_of_appointment, slot_booked, doc_name, doc_location)
            }
        })

        let sql = `INSERT INTO booking_details VALUES (?,?,?,?);`
        conn.query(sql, Object.values(req.body), (error, result) => {
            if (error) res.status(400).send(error)
            else res.send(req.body)
        })


    })


    Router.post('/previous-records', (req, res) => {
        const { email } = req.body
        let sql = `SELECT * FROM booking_details where patient_email='${email}';`
        try {
            conn.query(sql, (error, result) => {
                // console.log(result);
                if (error) res.status(400).send(error)
                // else if (result.length === 0)
                //     res.send("No previous records available")
                else {
                    let records = result;
                    // records.date_of_appointment.toISOString().split('T')[0]
                    // console.log(records);
                    let final_records = [];
                    records.map((rec, index) => {
                        // console.log(rec);
                        let sql_ = `SELECT name, specialisation, qualification, timeslot_start, fees, location FROM Doctor WHERE email='${rec.doctor_email}'`;
                        conn.query(sql_, (error, values) => {
                            final_records.push({ ...rec, 'doctor': values[0], 'date_of_appointment': rec.date_of_appointment.toISOString().split('T')[0] })
                            if (index === records.length - 1)
                                res.send(final_records)
                        })
                    })
                }
            })
        }
        catch (error) {
            console.log(error)
        }

    })

    Router.post('/update', async (req, res) => {
        let { type, updatetype, newvalue, samefield, samevalue } = req.body
        if (updatetype === 'password')
            newvalue = await hashPassword(newvalue)
        let sql = `UPDATE ${type} SET ${updatetype} AS '${newvalue}' WHERE ${samefield}='${samevalue}' `
        // conn.query(sql,(error,result)=>{
        //     if(error) res.send(error)
        //     else res.send(result)
        // })
        try {
            const [rows, field] = conn.promise().query(sql)
            sql = `SELECT * FROM ${type} WHERE ${samefield}='${samevalue}'`
            const [rowsnew, fd] = conn.promise().query(sql)
            console.log(rowsnew)

        }
        catch (error) {
            console.log(error)
            res.send(error)
        }
    })
    return Router
}