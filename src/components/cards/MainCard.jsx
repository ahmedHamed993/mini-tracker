'use client';
import React, { useState } from 'react'
import Link from 'next/link'
// component 
import ProgressBar from '../ProgressBar/ProgressBar'
// firebase 
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '@/firebaseConfig';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const MainCard = ({id, name, percentage}) => {
  const [deleted, setDeleted] = useState(false);
  const deleteCard = async ()=>{
    await deleteDoc(doc(db, "items", id))
      .then(()=> {
        enqueueSnackbar("card deleted successfully", {variant:'success'});
        setDeleted(true)
      })
      .catch(()=>  enqueueSnackbar("error", {variant:'error'}));
  }
  return (
    <div className={`shadow-md p-4 rounded-sm w-64 ${deleted? 'hidden':''}`}>
      <SnackbarProvider />
        <h2 className='text-xl capitalize text-center mb-2'>{name}</h2>
        <ProgressBar percentage={percentage}/>
        <div className='flex w-full mt-2 gap-2'>
            <Link href={`/card/${id}`} className='py-2 px-2 text-xs border border-blue-700 text-blue-700 rounded-md '>Edit</Link>
            <button className='py-2 px-2 text-xs border border-red-700 text-red-700 rounded-md ' onClick={deleteCard}>delete</button>
        </div>
    </div>
  )
}

export default MainCard