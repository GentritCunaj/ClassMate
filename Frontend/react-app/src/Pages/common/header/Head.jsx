import React from "react"

const Head = ({prop}) => {

  
  const style = prop ? {color:"darkslategray"} : {}
  return (
    <>
      <section style={style} className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1 style={style}>CLASSMATE</h1>
            <span style={style}>ONLINE EDUCATION & LEARNING</span>
          </div>

        </div>
      </section>
    </>
  )
}

export default Head
