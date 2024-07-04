// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./NavBar.css"

// eslint-disable-next-line react/prop-types
function NavBar({displayModal}) {
  return (
    <div className='NavBarHeader'>
        <p>My Tasks</p>
        <button onClick={displayModal}>Add New Task</button>
      
    </div>
  )
}

export default NavBar
