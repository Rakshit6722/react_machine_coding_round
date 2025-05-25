import React from 'react'
import Popover from './components/Popover'

const App = () => {
  return (
    <div>
      <Popover>
        <Popover.Action>Click Me!</Popover.Action>
        <Popover.Content>This is the content!</Popover.Content>
      </Popover>
      Content surrounding popover!
    </div>
  )
}

export default App
