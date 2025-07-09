import express from 'express'
import cors from 'cors'
import http from 'http'
import initializeSocket from './socket.js'
import { setIoInstance } from './socketInstance.js'
import orderRoutes from './order.route.js'

const app = express()

const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use("/api",orderRoutes)

// Initialize socket connection
const io = initializeSocket(server)
setIoInstance(io)

server.listen(3000, () => {
    console.log("server started on port 3000")
})
