import React from 'react'

const ErrorMessage = ({errorMsg}) => {
  return(
    <p className=' text-[12px] pl-2 text-red-600'>{errorMsg ?? ""}</p>
  ) 
}

export default ErrorMessage