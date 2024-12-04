import React from 'react'
import '.././globals.css'

export default function Loader() {
  return (
    <div className=' mt-[60px] flex flex-col items-center gap-5 h-[15re]'>
        <div className='loader'/>
        <p className=" text-yellow-900 text-3xl font-bold text-center">Loading...</p>
    </div>
  )
}
