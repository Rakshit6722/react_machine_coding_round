import React, { createContext, useEffect, useRef, useState } from 'react'
import Action from './Action'
import Content from './Content'

export const PopoverContext = createContext({})

function Popover({ children }) {

    const [isOpen, setIsOpen] = useState(false)

    const contentRef = useRef(null)
    const buttonRef = useRef(null)

    function togglePopover() {
        const newValue = !isOpen
        setIsOpen(newValue)

        if (newValue) {
            // contentRef.current.style.top = ''
            const { top, left, height } = contentRef.current.getBoundingClientRect()
            const { top: bTop, left: bLeft, height: bHeight } = buttonRef.current.getBoundingClientRect()

            contentRef.current.style.top = `${bTop + bHeight + 10}px`
            contentRef.current.style.left = `${bLeft}px`

            // const contentPosition = top + height
            // if (contentPosition >= window.innerHeight) {
            //     contentRef.current.style.top = `${top - contentPosition}px`
            // }
        }
    }

    return (
        <PopoverContext.Provider value={{ isOpen, contentRef, togglePopover, buttonRef }}>
            <div className='popover'>
                {children}
            </div>
        </PopoverContext.Provider>
    )
}

export default Popover

Popover.Action = Action
Popover.Content = Content

