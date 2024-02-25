import express from 'express'
import { connect } from 'mongoose'
import router from './routes/index.js'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.POST

const app = express()
const URI_DB = process.env.URI_DB

connect(URI_DB)
app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`ZzZ Example app listening on port ${PORT}`)
})