import React from 'react'
import notFound from '../images/11.svg'
import '../styles/NotFound.css'
const NotFound = () => {
  return (
    <div className = "nfound">
    <img src = {notFound} alt = "404 doodle" className = "notfound-pic"></img>
    <h2 className = "notfound-404">404 Not Found</h2>
</div>
  )
}

export default NotFound