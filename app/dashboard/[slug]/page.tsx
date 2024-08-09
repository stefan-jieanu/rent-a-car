import React from 'react'
import prisma from '../../lib/db';
import Link from 'next/link';

export default async function PostPage({ params }) {

  const car = await prisma.car.findUnique({
    where: {
      slug: params.slug,
    },
  })

  return (
    <div className='flex flex-col items-center gap-y-5 pt-24'>
      <h1 className='text-3xl font-semibold'>Car info</h1>
      <p>Brand: {car?.brand}</p>
      <p>Model: {car?.model}</p>
      <p>Production year: {car?.production.getFullYear()}</p>
      <p>Description: {car?.description}</p>
      <p>Cost per hour: {car?.cost}</p>
    </div >
  )
}