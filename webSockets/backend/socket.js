import { Server } from 'socket.io'

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket) => {
        console.log("user connected", socket.id)

        socket.on("order-connection", (orderId) => {
            socket.join(orderId);

        })

        socket.on("update-status-shipped", ({message, orderId}) => {
            console.log("inside update status shipped event")
            io.to(orderId).emit("update-status", message)
        })
    })

    return io
}

export default initializeSocket