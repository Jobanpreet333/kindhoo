import React from 'react'
import kind from '../kindhood.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell, faHouse, faMessage, faCircleUser ,faUsers} from '@fortawesome/free-solid-svg-icons'
function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid head">
          <img src={kind} alt="" className='img1' />
          <a class="navbar-brand" href="#"><h1>KindHood</h1></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse ms-auto" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/"><FontAwesomeIcon icon={faHouse} /></a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/"><FontAwesomeIcon icon={faBell} /></a>
              </li>


              <li class="nav-item">
                <a class="nav-link" href="/feedback"><FontAwesomeIcon icon={faMessage} /></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/chat/:userId"><FontAwesomeIcon icon={faUsers} /></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/profile"><FontAwesomeIcon icon={faCircleUser} /></a>
              </li>

            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
