import React, { useContext } from 'react'
import { PopoverContext } from './Popover'
import { createPortal } from 'react-dom'

function Content({ children }) {

    const { isOpen, contentRef } = useContext(PopoverContext)

    const className = isOpen ? "content" : "content hidden"

    return createPortal(
        <div ref={contentRef} className={className}>
            {children}
        </div>,
        document.body
    )


}

export default Content
