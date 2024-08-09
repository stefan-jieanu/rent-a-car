import React from 'react';
import prisma from '../lib/db';
import Link from 'next/link';
import { auth } from '@/auth';
import { Button, Card } from "flowbite-react";

export default async function Dashboard() {
  const session = await auth();

  if (session?.user === undefined) {
    return <h1>No access</h1>
  }

  // const posts = await prisma.post.findMany({
  //   orderBy: {
  //     createdAt: "desc"
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     slug: true
  //   },
  //   take: 10,
  //   // skip: 10
  // });

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!
    },
    include: {
      cars: true,
    }
  })

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl mb-4'>Hello, <strong>{user!.name}</strong></h1>
      <div className='flex gap-4 items-center'>
        <h2 className='text-2xl'>Car offers</h2>
        <Link href='dashboard/add-car'><Button>Add new</Button></Link>
      </div>
      <div className='flex border-t border-b border-black py-5 leading-8'>
        {user?.cars.map((car) => (
          <div key={car.id} className='flex items-center justify-between px-5'>
            <Card href={`/dashboard/${car.slug}`} className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {car.brand}, {car.model}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {car.description}
              </p>
              {/* <Link href={`/posts/${car.slug}`}>See more</Link> */}
            </Card>
          </div>
        ))}
      </div>

    </div >
  )
}