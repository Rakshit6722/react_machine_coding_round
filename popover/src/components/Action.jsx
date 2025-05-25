import React, { useContext } from 'react'
import { PopoverContext } from './Popover'

function Action({ label, node, children }) {

    const { togglePopover, buttonRef } = useContext(PopoverContext)

    if (node) {
        return <button ref={buttonRef} onClick={togglePopover}>{node}</button>
    }
    if (children) {
        return <button ref={buttonRef} onClick={togglePopover}>{children}</button>
    }
    return (
        <button ref={buttonRef} onClick={togglePopover}>{label}</button>
    )
}

export default Action
