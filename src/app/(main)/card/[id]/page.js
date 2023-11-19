"use client";
import React, { useEffect, useState } from 'react';
// react hook form
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addCardSchema } from '@/schemes/card/addCardSchema';
// components 
import InputField from '@/components/inputs/InputField';
// next auth 
import { useSession } from 'next-auth/react';
// firebase 
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebaseConfig';
// alerts 
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
const EditCardPage = ({params}) => {
  const [currentCard, setCurrentCard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // config  form 
   const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
        name: '',
        total: '',
        spent:[
          {note:"",value:""}
        ]
    },
    resolver: yupResolver(addCardSchema),
    mode: 'onChange',
  });
  // fields handle 
  const { fields, append, remove } = useFieldArray({
    control,
    name: "spent"
    
  });
  // submit form 
  const onSubmit = async (values) => {
    // const data = {
    //   ...values, 
    //   userId:session?.user?.uid,
    // }
    // const addNewCardRes = await addDoc(collection(db, "items"), data);
    // if(addNewCardRes.id){
    //   enqueueSnackbar("card added successfully",{variant:'success'});
    //   reset();
    // } else {
    //   enqueueSnackbar("try again later",{variant:'error'});
    // }
    console.log(values)
  }
  // fetch current card data 
  const fetchCurrentCard = () => {
    const docRef = doc(db, "items", params.id);
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        setCurrentCard(doc.data());
        reset({
          name: doc.data().name,
          total: doc.data().total,
          spent: doc.data().spent,
        })
        setLoading(false);
      } 
    }).catch(error => {
      enqueueSnackbar("error",{variant:"error"})
    });
  }
  useEffect(()=>{
    fetchCurrentCard();
  },[])

  if(loading) return <p className='text-center'>loading....</p>
  return (
    <div className='flex gap-2 justify-center items-center py-4'>
    <SnackbarProvider />
    <div className='container mx-auto max-w-lg px-2 py-24'>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex gap-2 flex-wrap md:flex-nowrap '>
          <InputField 
            id='name' 
            register={{...register('name')}} 
            label='Card Name'
            placeholder='enter card name'
            errorMessage={errors?.name?.message}
          />
          <InputField 
            id='total' 
            label='Spent Goal'
            placeholder='enter your spen goal'
            type='number'
            register={{...register('total')}} 
            errorMessage={errors?.total?.message}
          />
        </div>
        <div className='w-full flex flex-col gap-4'>
          <div className='flex justify-between items-center my-2'>
            <h6>All What you spent</h6>
            <button 
              type='button'
              onClick={()=> append({note:"",value:""})}
              className='border-2 border-sky-600  text-sky-600 w-8 h-8 rounded-md'
            >
              +
            </button>
          </div>
          {fields?.map((item, index) => (
            <div className='w-full flex gap-1 flex-wrap items-end md:flex-nowrap pb-2 [&:not(:last-child)]:border-b border-slate-100 ' key={item.id}>
              <InputField 
                id={`spent.${index}.value`} 
                label="value" 
                placeholder='ex. 1500'
                type='number'
                register={{...register(`spent.${index}.value`)} }
                errorMessage={errors?.spent?.[index]?.value.message}
              />
              <InputField 
                id={`spent.${index}.note`} 
                label="Note" 
                placeholder='ex. rent'
                register={{...register(`spent.${index}.note`)} }
                errorMessage={errors?.spent?.[index]?.note.message}
              />
              <button 
                type='button'
                onClick={() => remove(index)}
                className='border-2 border-red-600  text-red-600 w-16 h-8 rounded-md mb-2'
              >
                -
              </button>
            </div>
          ))}
        </div>
        <button 
          type='submit' 
          className='bg-primary text-slate-50 mt-2 py-2 px-4 block rounded-md w-full'
        >
          Save
        </button>
      </form>
    </div>
  </div>
  )
}

export default EditCardPage