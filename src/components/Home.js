import React from 'react'
import kind from '../kindhood.png'
import Frame from '../helpp.png'
function Home() {
  return (
    <>

      <div className='hero'>
        <img src={Frame} alt="" className='img2 img-fluid' />
      </div>


      <div className='middle' id='help-section'>
        <div className="btnn">
          <button type="button" class="btn btn-primary">NEED HELP</button>
          <button type="button" class="btn btn-secondary">LEND HELP</button>
        </div>

        <div className="for">
          <div class="text-center" >
            <hr />
            <h2 >
              Who is KindHood For?
            </h2>
          </div>

          <div className="mid">
            <div class="col-md-3 mx-2 mb-4">
              <div class="card p-4 shadow" >
                <div className='emoji'>👧</div>
                <h4 class="mt-2 " id='head'>Children</h4>
                <p class="medium">Get help with homework, art, and more!</p>
              </div>
            </div>
            <div class="col-md-3 mx-2 mb-4">
              <div class="card p-4 shadow" >
                <div className='emoji'>🧑</div>
                <h4 class="mt-2 " id='head'>Adults</h4>
                <p class="medium">Support for daily chores and family needs.</p>
              </div>
            </div>

            <div class="col-md-3 mx-2 mb-4">
              <div class="card p-4 shadow" >
                <div className='emoji'>👵</div>
                <h4 className="mt-2 " id='head'  >Seniors</h4>
                <p class="medium">Care, company, and community assistance.</p>
              </div>
            </div>
          </div>
        </div>
        <p id='para'>“KindHood is a place where everyone — young or old — can find help and give help with a smile.”</p>

      </div>

<div className='footerH'>
      <div className="footer">
        <div className='col1'>
          <div id='col1'>
 <img src={kind} alt="" />
             <h3>KindHood</h3>
          </div>
         
             <p>Bringing people together to help each other in local communities.</p>
        </div>
           <div className='col2'>
            <h3>Links</h3>
            <a href="/"><h6>Home</h6></a>
            <a href="/need"><h6>Need Help</h6></a>
            <a href="/lend"><h6>Lend Help</h6></a>
            <a href="/login"><h6>Login</h6></a>
            <a href="/sign"><h6>SignUp</h6></a>
           </div>
           
           <div className='col3'>
            <h3>Contact Us</h3>
           <p>Instagram</p>
           <p>Twitter</p>
           </div>
           <div className='col4'>
            <h3>Legal</h3>
           <p>Terms of Service</p>
           <p>Provacy Policy</p>
           </div>
      </div>
      <p>© 2025 KindHood. All rights reserved.</p>
      </div>
    </>
  )
}

export default Home
