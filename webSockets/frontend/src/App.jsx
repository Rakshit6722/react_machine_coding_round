import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

const socket = io(baseUrl)

const App = () => {
  const [status, setStatus] = useState('')

  useEffect(() => {
    socket.on("update-status", (message) => {
      console.log("Received status-update-shipped event:", message);
      setStatus(message)
    })

    return () => {
      socket.off("update-status")
    }
  }, [])

  const createOrder = async () => {
    const response = await axios.post(`${baseUrl}/api/createOrder`, {
      userId: "user_123",
      items: ["iphone11", "keyboard"]
    })

    if (response?.data?.data) {
      console.log(response?.data?.data?.orders[0].order_123.status)
      socket.emit("order-connection", "order_123")
      setStatus(response?.data?.data?.orders[0].order_123.status)
    }
  }

  const updateStatus = async () => {
    const response = await axios.put(`${baseUrl}/api/updateOrderStatus/order_123`)
    console.log("response", response)
    socket.emit("update-status-shipped", {message: "shipped", orderId: "order_123"})
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-xl font-bold text-white text-center">Order Tracking System</h1>
        </div>
        
        <div className="p-6">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Order #123</h2>
            <p className="text-sm text-gray-600">2 items (iPhone 11, Keyboard)</p>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Order Status:</span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                !status ? 'bg-gray-100 text-gray-800' : 
                status === 'shipped' ? 'bg-green-100 text-green-800' : 
                'bg-yellow-100 text-yellow-800'
              }`}>
                {!status ? 'Not Created' : status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div 
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                    !status ? 'w-0 bg-gray-400' : 
                    status === 'shipped' ? 'w-full bg-green-500' : 
                    'w-1/2 bg-yellow-500'
                  }`}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-600">
                <div className="text-center">
                  <div className={`w-6 h-6 mb-1 rounded-full mx-auto flex items-center justify-center ${
                    status ? 'bg-green-500 text-white' : 'bg-gray-300'
                  }`}>
                    1
                  </div>
                  <span>Created</span>
                </div>
                <div className="text-center">
                  <div className={`w-6 h-6 mb-1 rounded-full mx-auto flex items-center justify-center ${
                    status === 'shipped' ? 'bg-green-500 text-white' : 'bg-gray-300'
                  }`}>
                    2
                  </div>
                  <span>Shipped</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col space-y-3">
            <button 
              onClick={createOrder}
              disabled={status !== ''}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                status ? 
                'bg-gray-300 cursor-not-allowed' : 
                'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              Create Order
            </button>
            
            <button 
              onClick={updateStatus}
              disabled={!status || status === 'shipped'}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                !status || status === 'shipped' ? 
                'bg-gray-300 cursor-not-allowed' : 
                'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
            >
              Update Status to Shipped
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
