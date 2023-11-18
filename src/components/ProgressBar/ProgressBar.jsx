import React from 'react'

const ProgressBar = ({percentage}) => {
  return (
    <div className='w-full rounded-md bg-slate-100 relative h-2 '>
        <div style={{width:percentage}} className={` rounded-md bg-primary absolute top-0 left-0 h-full z-20`} />
    </div>
  )
}

export default ProgressBar