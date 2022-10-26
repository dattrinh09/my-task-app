import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {

  return (
    <div className="home">
      <div className="container">
        <div className="home-content">
          <div className="home-item">
            <h1>Well come to my Todo App</h1>
            <span>Click <NavLink style={{ color: "blue" }} to="/tasks">here</NavLink> to get started</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home