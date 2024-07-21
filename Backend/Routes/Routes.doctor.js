const express = require('express')
const Router = express.Router()

module.exports = (conn) => {
    let date = new Date(); // Current date and time
    // const newdate = new Date();
    // date.setDate(date.getDate() + 1);
    const dateString = date.toISOString().split('T')[0]
    console.log(date)
    // let sql=`SELECT * from booking_details WHERE date_of_appointment<'${dateString}';`
    // conn.query(sql,(error,result)=>{
    //     if(error) console.log(error)
    //     let sql=`INSERT INTO previous_records VALUES (?)`
    //     result.map((res)=>{
    //         conn.query(sql,[Object.values(res)],(error,result)=>{
    //             if(error) console.log(error)
    //             console.log(result)
    //         })
    //     })
    // })

    Router.post('/', (req, res) => {
        // const date = new Date(); // Current date and time
        // const dateString = date.toISOString().split('T')[0]

        const nextWeek = new Date();
        nextWeek.setDate(date.getDate() + 7);
        const nextWeekStirng = nextWeek.toISOString().split('T')[0]
        let { email } = req.body

        //getting the number of slots
        let sql = `SELECT timeslot_start,timeslot_end FROM doctor WHERE email='${email}';`
        conn.query(sql, (error, result) => {
            if (error) res.status(400).send(error)
            else if (result.length == 0)
                return
            doc = result[0]
            let final_slots = []
            for (let i = 0; i < 7; i++)
                final_slots.push(new Array(doc.timeslot_end - doc.timeslot_start).fill({ status: false, content: {} }))
            console.log(final_slots)

            //getting the booked slots
            sql = `SELECT * FROM booking_details WHERE doctor_email='${email}' AND date_of_appointment BETWEEN '${dateString}' AND '${nextWeekStirng}'  GROUP BY date_of_appointment,patient_email,slot_booked`;
            conn.query(sql, (error, result) => {
                if (error) res.status(400).send(error)

                date.setUTCHours(0, 0, 0, 0);
                result.map((res) => {
                    res.date_of_appointment.setUTCHours(0, 0, 0, 0);
                    let val = res.date_of_appointment - date
                    console.log(res.date_of_appointment, date, val)
                    if (val >= 0)
                        final_slots[val / 86400000][res.slot_booked] = { status: true, content: { patient_email: res.patient_email, date: res.date_of_appointment, slot: res.slot_booked } }

                    return 1
                })
                res.send({ slots: final_slots, start_time: doc.timeslot_start })
            })
        })


    })

    Router.post('/get-patient', (req, res) => {
        const { patient_email } = req.body
        // let sql=`SELECT p.email,p.name,p.sex,p.age from patient p,booking_details bd WHERE bd.patient_email=p.email AND bd.patient_email='${patient_email}' AND bd.doctor_email='${doctor_email}' AND bd.date_of_appointment='${date}' AND bd.slot_booked=${slot};`
        let sql = `SELECT name,email,age,sex FROM patient WHERE email='${patient_email}'`
        conn.query(sql, (error, result) => {
            if (error) res.status(400).send(error)
            if (result.length == 0) {
                res.status(400).send('Error')
                return
            }
            res.send(result[0])
        })
    })
    Router.post('/booking-history', (req, res) => {
        const { doctor_email } = req.body

        let sql =
            `SELECT P.name, P.email, P.age, P.sex,BD.date_of_appointment, BD.slot_booked+timeslot_start as slot_booked from
            Patient P
        join booking_details  BD on P.email=BD.patient_email
        join Doctor D on D.email = BD.doctor_email
        where BD.doctor_email='${doctor_email}'
        order by BD.date_of_appointment desc`
        conn.query(sql, (error, result) => {
            if (error) res.status(400).send(error)
            else {
                res.send(result)
            }
        })
    })

    Router.post('/update-profile', (req, res) => {
        const { username, email, qualification, specialisation, fees, location } = req.body;

        let sql = `UPDATE doctor 
               SET username = ?, qualification = ?, specialisation = ?, fees = ?, location = ?
               WHERE email = ?;`;
        const values = [username, qualification, specialisation, fees, location, email];
        conn.query(sql, values, (err, result) => {
            if (err) res.status(400).send({ status: false })
            else {
                res.send({ status: true })
            }
        });
    })


    return Router
}