import React from 'react';
// components 
import ErrorMessage from '../errorMessage/ErrorMessage'

const InputField = ({id = "", label, placeholder = "", type="text", register, errorMessage= ""}) => {
  return (
    <div className=' w-full'>
        <label htmlFor={id} className='text-slate-600 mb-2 block'>{label}</label>
        <input 
            id={id} 
            type={type} 
            placeholder={placeholder } 
            {...register}
            className={` w-full py-2 px-3 outline-none rounded-md border-2 border-slate-100 focus:border-primary ${errorMessage ? 'border-red-600' :''} `}
        />
        <ErrorMessage errorMsg={errorMessage} />
    </div>
  )
}

export default InputField