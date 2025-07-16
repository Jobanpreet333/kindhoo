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
          <button type="button" class="btn btn-primary"><a href="/needhelp">NEED HELP</a></button>
          <button type="button" class="btn btn-secondary"><a href="/lendhelp">LEND HELP</a></button>
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

      
    </>
  )
}

export default Home
