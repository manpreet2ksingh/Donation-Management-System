require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const ngoRoutes = require('./routes/ngo')
const mailRoutes = require('./routes/mail')

const PORT = process.env.PORT || 8000

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true}
    )
    .then(()=>console.log("DB connected"))
    .catch(error=>console.log(error))

mongoose.connection.on('connected',()=>{
    console.log("database connected!!!!")
})

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(expressValidator())

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))
}

app.use(morgan('dev'))
// routes middleware
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',ngoRoutes);
app.use('/api',mailRoutes);

app.listen(PORT,()=>{
    console.log(`Server is up and running on PORT ${PORT}`);
})
