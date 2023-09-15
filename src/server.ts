import express from 'express'
import cors from 'cors'

import routes from './routes'
import dotenv from 'dotenv'


const server = express()

dotenv.config()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use('/api', routes)

server.listen(12344, () => {
  console.log('SERVER RUNNING ON PORT 12344')
})