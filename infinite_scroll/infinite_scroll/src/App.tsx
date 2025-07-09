import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'


const apiUrl = "https://mockflow-xi.vercel.app/api/mocks/rakshit435/products"


const App = () => {

  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const pageRef = useRef(1)

  const observer = useRef<IntersectionObserver | undefined>(null)

  useEffect(() => {
    fetchProducts()
  }, [currentPage])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${apiUrl}?page=${pageRef.current}`)
      const currentProducts = response?.data?.data
      console.log(response?.data)
      setProducts((prev: any) => [...prev, ...currentProducts])
      setHasMore(currentProducts.length > 0)
    } catch (err: any) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const productRef = useCallback(
    (node: HTMLDivElement) => {

      if(isLoading || !hasMore) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          pageRef.current += 1
          setCurrentPage(pageRef.current)
        }

      })
      if (node) observer.current?.observe(node)
    },
    [hasMore, isLoading, currentPage]
  )


  return (
    <>
      <div className='text-red-200 flex-col'>
        {
          products.map((item, index) => {
            if (index === products.length - 1) {
              return (
                <div ref={productRef} className='border-2 border-white p-4'>
                  {item.name}
                  {item.price}
                  {item.category}
                </div>
              )
            }
            return (
              <div className='border-2 border-white p-4'>
                {item.name}
                {item.price}
                {item.category}
              </div>

            )
          })
        }
      </div>
      {
        isLoading && (
          <p>Loading</p>
        )
      }
    </>
  )
}

export default App
