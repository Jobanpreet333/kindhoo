import React from 'react'
import kind from '../kindhood.png'
function Footer() {
  return (
    <div>
      <div className='footerH '>
              <div className="footer ">
                <div className='col1 '>
                  <div id='col1'>
                    <img src={kind} alt="" />
                    <h3>KindHood</h3>
                  </div>
      
                  <p>Bringing people together to help each other in local communities.</p>
                </div>
                <div className='col2 '>
                  <h3>Links</h3>
                  <a href="/"><h6>Home</h6></a>
                  <a href="/need"><h6>Need Help</h6></a>
                  <a href="/lend"><h6>Lend Help</h6></a>
                  <a href="/login"><h6>Login</h6></a>
                  <a href="/sign"><h6>SignUp</h6></a>
                </div>
      
                <div className='col3 '>
                  <h3>Contact Us</h3>
                  <h6 id='para2'>Instagram</h6>
                  {/* <p id='para2'>Twitter</p> */}
                  <h6>kindhood@gmail.com</h6>
                </div>
                <div className='col4 '>
                  <h3>Legal</h3>
                  <h6 id='para2'>Terms of Service</h6>
                  <h6 id='para2'>Privacy Policy</h6>
                </div>
              </div>
              <p id='para1'>© 2025 KindHood. All rights reserved.</p>
            </div>
    </div>
  )
}

export default Footer
