import express from 'express'
import { createOrder, getOrders, updateOrderStatus } from './order.controller.js'

const router = express.Router()

router.post('/createOrder', createOrder)
router.put('/updateOrderStatus/:orderId', updateOrderStatus)
router.get('/getOrders', getOrders)

export default router