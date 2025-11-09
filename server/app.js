const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')

dotenv.config({path:'./config/config.env'})

app.use(express.json({ limit: '10mb' }))

app.use(cors({
  origin: [
    "https://job-lane-gamma.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(fileUpload())

const User = require('./routes/UserRoutes')
const Job = require('./routes/JobRoutes')
const Application = require('./routes/ApplicationRoutes')
const Admin = require('./routes/AdminRoutes')
const { errorMiddleware } = require('./middlewares/error')

app.use("/api/v1",User)
app.use("/api/v1",Job)
app.use("/api/v1",Application)
app.use("/api/v1",Admin)

app.get("/",(req,res)=>{
  res.json("Backend is Working ✅")
})

app.use(errorMiddleware);

module.exports = app;
