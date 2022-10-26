import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const [click, setClick] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    setClick(!click)
  }

  const handleSignOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    setClick(false)
    navigate("/")
  }

  return (
    <div className='nav'>
      <div className="container">
        <div className="row">
          <div className='nav-icon'>
            <NavLink to='/'>
              <img src="https://monstar-lab.com/vn/wp-content/themes/monstar_lab/public/images/revamp/logo.png" alt="home-icon" />
            </NavLink>
          </div>
          <ul className="nav-items">
            {localStorage.getItem('userId') ? (
              <>
                <li className='nav-item'>
                  <NavLink to='/tasks'>Tasks</NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/categories'>Categories</NavLink>
                </li>
                <li className='nav-item' onClick={handleClick} style={{cursor: "pointer"}}>
                  {localStorage.getItem('username')}
                </li>
                {
                  click && (
                    <div className="signout-form" onClick={handleSignOut}>
                      Sign Out
                    </div>
                  )
                }
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <NavLink to='/sign-in'>Sign In</NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/sign-up'>Sign Up</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar