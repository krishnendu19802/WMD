const express = require('express')
const app = express()
const mysql2 = require('mysql2');
require('dotenv').config();
const prdictionRouter = require('./Routes/Routes.prediction.js')

const cors = require('cors')
port = 3000

const loginRouter = require('./Routes/Routes.login')
const registerRouter = require('./Routes/Routes.register')
const patientRoute = require('./Routes/Routes.patient.js')
const doctorRoute = require('./Routes/Routes.doctor.js')
process.env.TZ = 'IST';


app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors())


// 192.168.100.13
const conn = mysql2.createConnection({
    host: process.env.DB_host,
    port: 3306, // Port is specified separately from the host
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_db_name
});



conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
    app.listen(port, () => {
        console.log('App listening on port: ', port)
    })
});

app.use('/login', loginRouter(conn))
app.use('/register', registerRouter(conn))
app.use('/patient', patientRoute(conn))
app.use('/doctor', doctorRoute(conn))
app.use('/prediction', prdictionRouter(conn))





// conn.end((err) => {
//     if (err) {
//         console.error('Error closing MySQL connection:', err);
//         return;
//     }
//     console.log('MySQL connection closed');
// });
// app.use('/maiddetails',MaidRouter(conn))
// app.use('/',UserRouter(conn))