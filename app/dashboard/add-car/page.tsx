import AddCarForm from '@/app/ui/add-car-form';
import React from 'react';

export default async function AddCar() {
  return (
    <div>
      <h1 className='text-3xl font-semibold mb-4'>Add new car</h1>
      <AddCarForm />
    </div>
  )
}