import express from 'express'
import { connect } from 'mongoose'
import router from './src/routes/index.js'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.POST || 5002

const app = express()
const URI_DB = process.env.URI_DB || 'mongodb+srv://nghinguyenzero:admin%401a2b3c@clusterzero.1pcv2up.mongodb.net/zero_store'

connect(URI_DB)
app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`ZzZ Example app listening on port ${PORT}`)
})