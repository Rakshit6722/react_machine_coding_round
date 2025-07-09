import { orders } from "./data.js"
import { getIoInstance } from "./socketInstance.js"

export const createOrder = (req, res) => {
    const { userId, items } = req.body

    const order_Id = "order_123"

    const existing_order = orders.find((item) => {
        return item.hasOwnProperty(order_Id)
    })

    if (existing_order) {
        return res.status(200).json({
            success: false,
            data: {
                orders
            },
            message: "order already present"
        })
    }

    const new_order = {
        [order_Id]: {
            userId,
            status: "pending"
        }
    }


    orders.push(new_order)

    // const io = getIoInstance()
    // if (!io) {
    //     console.error("Socket.io instance is not available");
    //     return res.status(500).json({
    //         success: false,
    //         message: "Socket.io instance is not initialized",
    //     });
    // }
    // console.log("io instance", io)

    // io.to(order_Id).emit("status-update-shipped", "shipped")


    console.log(`Emitting to room: order_${order_Id}`);

    return res.status(200).json({
        success: true,
        data: {
            orders
        },
        message: `Order created succesfully for user: ${userId}`
    })

}

export const updateOrderStatus = (req, res) => {
    const { orderId } = req.params


    //returns an actual reference to the array in which we are searching on
    const order = orders.find((item) => {
        return item.hasOwnProperty(orderId)
    })

    const found_order = order[orderId]
    found_order.status = "shipped"

    return res.status(200).json({
        success: true,
        message: "order status updated"
    })
}


export const getOrders = (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            orders
        },
        message: "Order fetched successfully"
    })
}