import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
  <div className="container">

    <a className="navbar-brand" href="/"> <img alt="Namma Yatri logo" src="https://nammayatri.in/logos/nammaYatrilogo.svg"/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/"className="nav-link active" >Home</Link>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="https://nammayatri.in/about/">About</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="https://nammayatri.in/open/">OpenData</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Navbar