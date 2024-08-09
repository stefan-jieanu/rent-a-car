import Link from 'next/link'
import prisma from './lib/db';
import { Card } from 'flowbite-react/components/Card';

export default async function Home() {

  const cars = await prisma.car.findMany();

  return (
    <main>
      <h1 className='text-3xl mb-4'>Cars to rent!</h1>
      <div className='flex border-t border-b border-black py-5 leading-8'>
        {cars.map((car) => (
          <div key={car.id} className='flex items-center justify-between px-5'>
            <Card href='#' className="max-w-sm">
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
    </main>
  );
}
