var nodemailer = require('nodemailer');
require('dotenv').config();

function sendMail(patient_email, doctor_email, date_of_appointment, slot_booked, doc_name, doc_location) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSKEY
        }
    });

    var mailOptions = {
        from: process.env.EMAIL_ID,
        to: patient_email,
        subject: 'BookDoc :: Doctor Appointment Confirmed ',

        html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">

        <h2 style="color: #007bff;">Appointment Confirmation</h2>
        
        <p><strong>Doctor Name:</strong> <span style="color: #28a745;">${doc_name}</span></p>
        <p><strong>Doctor Email:</strong> <span style="color: #28a745;">${doctor_email}</span></p>
        <p><strong>Date of Appointment:</strong> <span style="color: #28a745;">${date_of_appointment}</span></p>
        <p><strong>Slot Booked:</strong> <span style="color: #28a745;">${slot_booked}:00 Hr.</span></p>
        <p><strong>Doctor Location:</strong> <span style="color: #28a745;">${doc_location}</span></p>
        <p style="margin-top: 20px;">Thank you for scheduling an appointment. We look forward to seeing you.</p>
        <img src="cid:myImg" style="width:400px; height: auto;max-width:80vw;"/>
        
        </body>`,
        attachments: [{
            filename: 'logo1black.png',
            path: __dirname + '/logo1black.png',
            cid: 'myImg'
        }]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
module.exports = { sendMail };